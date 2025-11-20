import http from "http"
import { WebSocketServer, RawData } from "ws"
import { config } from "dotenv"
import { generateReply } from "./llm/mock"
import { createOpenRouterClient, ModelId } from "./agents/openrouter"
import { createPM, runPM } from "./agents/pm"
import { runPMFallback } from "./agents/pm_fallback"
import { IncomingMessage, OutgoingMessage, Types } from "./protocol"

config()

const PORT = Number(process.env.SINGULARITY_PORT || 8088)

const server = http.createServer((req, res) => {
  if (!req.url) {
    res.statusCode = 400
    res.end("Bad Request")
    return
  }
  if (req.method === "GET" && req.url.startsWith("/health")) {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ status: "ok" }))
    return
  }
  res.statusCode = 404
  res.end("Not Found")
})

const wss = new WebSocketServer({ server, path: "/ws" })

type HistoryMsg = { role: "user" | "assistant"; content: string }
const ChatHistory = new Map<string, HistoryMsg[]>()
function historyKey(agent: string | undefined, chatId: string): string {
  const a = (agent || "default").toLowerCase()
  return `${a}:${chatId}`
}

const SupportedModels: ModelId[] = [
  "openrouter/sherlock-dash-alpha",
  "openrouter/sherlock-think-alpha",
  "kwaipilot/kat-coder-pro:free",
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "alibaba/tongyi-deepresearch-30b-a3b:free",
  "meituan/longcat-flash-chat:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "openai/gpt-oss-20b:free"
]

wss.on("connection", (ws, req) => {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "?"
  console.log("WS client connected", { ip, url: req.url })
  ws.on("message", async (data: RawData) => {
    const buf = Array.isArray(data)
      ? Buffer.concat(data)
      : Buffer.isBuffer(data)
        ? data
        : Buffer.from(data as ArrayBuffer)
    console.log("WS message received", { size: buf.length, raw: buf.toString() })
    let msg: IncomingMessage
    try {
      msg = JSON.parse(buf.toString())
    } catch (e) {
      console.log("WS invalid JSON")
      const err: OutgoingMessage = { type: Types.Error, error: "invalid_json" }
      ws.send(JSON.stringify(err))
      return
    }

    if (msg.type === Types.Ping) {
      const pong: OutgoingMessage = { type: Types.Pong, ok: true }
      ws.send(JSON.stringify(pong))
      console.log("WS pong sent")
      return
    }

    if (msg.type === Types.Models) {
      ws.send(JSON.stringify({ type: Types.Models, content: JSON.stringify(SupportedModels) }))
      console.log("WS models listed")
      return
    }

    if (msg.type === Types.ChatMessage && msg.chat_id && msg.content) {
      const model = (msg.model as ModelId) || SupportedModels[0]
      const ack: OutgoingMessage = { type: Types.Ack, chat_id: msg.chat_id, ok: true, model, agent: msg.agent }
      ws.send(JSON.stringify(ack))
      console.log("WS ack sent", { chat_id: msg.chat_id, model })

      const hasKey = !!process.env.OPENROUTER_API_KEY
      const agentId = (msg.agent || msg.chat_id || "default").toLowerCase()
      const usePM = agentId === "pm"

      const key = historyKey(agentId, msg.chat_id)
      const prev = ChatHistory.get(key) || []

      try {
        let content = ""
        if (usePM) {
          if (hasKey && SupportedModels.includes(model)) {
            const pm = createPM(model)
            content = await runPM(pm as any, msg.content, undefined, prev)
          } else {
            content = runPMFallback(msg.content)
          }
        } else {
          if (hasKey && SupportedModels.includes(model)) {
            const llm = createOpenRouterClient(model)
            const res = await llm.invoke([{ role: "user", content: msg.content }])
            content = res.content as string
          } else {
            content = generateReply({ chat_id: msg.chat_id, content: msg.content })
          }
        }
        const updated: HistoryMsg[] = [
          ...prev,
          { role: "user", content: msg.content } as HistoryMsg,
          { role: "assistant", content } as HistoryMsg
        ]
        ChatHistory.set(key, updated.slice(-24))
        const out: OutgoingMessage = { type: Types.ChatReply, chat_id: msg.chat_id, content, model, agent: msg.agent }
        ws.send(JSON.stringify(out))
        console.log("WS reply sent", { chat_id: msg.chat_id, model, agent: msg.agent })
        
      } catch (err) {
        console.log("WS LLM error", { message: (err as any)?.message })
        const reply = usePM ? runPMFallback(msg.content) : generateReply({ chat_id: msg.chat_id, content: msg.content })
        const out: OutgoingMessage = { type: Types.ChatReply, chat_id: msg.chat_id, content: reply, model, agent: msg.agent }
        ws.send(JSON.stringify(out))
        console.log("WS reply sent (fallback)", { chat_id: msg.chat_id, model, agent: msg.agent, usePM })
        const updated: HistoryMsg[] = [
          ...prev,
          { role: "user", content: msg.content } as HistoryMsg,
          { role: "assistant", content: reply } as HistoryMsg
        ]
        ChatHistory.set(key, updated.slice(-24))
      }
      return
    }

    const err: OutgoingMessage = { type: Types.Error, error: "unsupported" }
    ws.send(JSON.stringify(err))
  })
  ws.on("close", (code, reason) => {
    console.log("WS client closed", { code, reason: reason?.toString() })
  })
  ws.on("error", (error) => {
    console.log("WS client error", { message: (error as any)?.message })
  })
})

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Singularity listening on http://localhost:${PORT}`)
  console.log(`WebSocket endpoint ws://localhost:${PORT}/ws`)
})