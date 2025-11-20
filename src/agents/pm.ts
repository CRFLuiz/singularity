import { ChatOpenAI } from "@langchain/openai"

export type PMContext = {
  projectStage?: "in_progress" | "new"
  repos?: string[]
  goals?: string[]
  stakeholders?: string[]
  requirements?: string[]
  stack?: string[]
}

export type PMHistoryMessage = {
  role: "user" | "assistant"
  content: string
}

const SYSTEM_PM = `Você é um Project Manager (PM) técnico.
- Objetivo: entender completamente o projeto do usuário e gerenciar o trabalho dos agentes de IA.
- Descubra se o projeto já está em andamento ou começando do zero.
- Se em andamento: mapeie repositórios existentes, aplicações, estado atual, pendências e prioridades.
- Se do zero: entenda necessidades, requisitos, escopo, metas, prazos, stakeholders e tecnologias sugeridas.
- Nunca invente informações. Sempre que houver dúvidas, faça perguntas claras ao usuário.
- Sugestões e abordagens só devem ser dadas quando o usuário solicitar explicitamente.
- Garanta que PM e usuário estejam alinhados nas mesmas ideias e objetivos (reconfirme pontos críticos).
- Faça perguntas objetivas e progressivas para completar entendimento.
- Quando todas as informações estiverem confirmadas, gere APENAS um JSON (sem texto adicional) com as chaves:
  { "project_name": string, "project_description": string, "technologies": string[], "objectives": string[], "requirements": string[] }.
- Até lá, responda com perguntas e checkpoints de entendimento, sem sugerir implementação.
`

export function createPM(model: string, apiKey?: string, baseURL?: string) {
  const llm = new ChatOpenAI({
    apiKey: apiKey || process.env.OPENROUTER_API_KEY || "",
    model,
    temperature: 0.2,
    maxTokens: 2048,
    configuration: { baseURL: baseURL || process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1" }
  })
  return llm
}

export async function runPM(llm: ChatOpenAI, userText: string, ctx?: PMContext, history?: PMHistoryMessage[]) {
  const system = SYSTEM_PM
  const context = ctx ? JSON.stringify(ctx) : "{}"
  const prev = (history || []).slice(-12)
  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: system },
    ...prev,
    { role: "user", content: `Contexto atual: ${context}\n\nPergunta/Descrição: ${userText}` }
  ]
  const res = await llm.invoke(messages)
  return typeof res.content === "string" ? res.content : JSON.stringify(res.content)
}