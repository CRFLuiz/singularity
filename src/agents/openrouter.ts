import { ChatOpenAI } from "@langchain/openai"

export type ModelId =
  | "openrouter/sherlock-dash-alpha"
  | "openrouter/sherlock-think-alpha"
  | "kwaipilot/kat-coder-pro:free"
  | "nvidia/nemotron-nano-12b-v2-vl:free"
  | "alibaba/tongyi-deepresearch-30b-a3b:free"
  | "meituan/longcat-flash-chat:free"
  | "nvidia/nemotron-nano-9b-v2:free"
  | "openai/gpt-oss-20b:free"

export function createOpenRouterClient(model: ModelId) {
  const apiKey = process.env.OPENROUTER_API_KEY || ""
  const baseURL = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1"
  return new ChatOpenAI({
    apiKey,
    model,
    temperature: 0.2,
    maxTokens: 2048,
    configuration: { baseURL }
  })
}