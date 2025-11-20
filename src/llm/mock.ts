export type ChatRequest = {
  chat_id: string
  content: string
}

export function generateReply(input: ChatRequest): string {
  const prefix = "Singularity"
  const ts = new Date().toISOString()
  return `${prefix} ${ts}: ${input.content}`
}