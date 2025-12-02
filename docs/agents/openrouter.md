# OpenRouter

- Client: `createOpenRouterClient(model)` — `singularity/src/agents/openrouter.ts`
- Variables: `OPENROUTER_API_KEY`, `OPENROUTER_BASE_URL` — `singularity/src/agents/openrouter.ts`

- Supported models — `singularity/src/server.ts`:
  - `openrouter/sherlock-dash-alpha`
  - `openrouter/sherlock-think-alpha`
  - `kwaipilot/kat-coder-pro:free`
  - `nvidia/nemotron-nano-12b-v2-vl:free`
  - `alibaba/tongyi-deepresearch-30b-a3b:free`
  - `meituan/longcat-flash-chat:free`
  - `nvidia/nemotron-nano-9b-v2:free`
  - `openai/gpt-oss-20b:free`

- Model discovery via WS:
  - Send `{ "type":"models.list" }` → returns list — `singularity/src/server.ts`
