export type IncomingMessage = {
  type: string
  chat_id?: string
  content?: string
  model?: string
  agent?: string
}

export type OutgoingMessage = {
  type: string
  chat_id?: string
  content?: string
  ok?: boolean
  error?: string
  model?: string
  agent?: string
}

export const Types = {
  ChatMessage: "chat.message",
  ChatReply: "chat.reply",
  Ack: "ack",
  Error: "error",
  Ping: "ping",
  Pong: "pong",
  Models: "models.list"
}