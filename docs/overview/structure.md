# Structure

- Código:
  - `singularity/src/server.ts` — servidor HTTP e WebSocket.
  - `singularity/src/protocol.ts` — tipos e constantes de mensagens.
  - `singularity/src/agents/*` — OpenRouter, PM, fallback.
  - `singularity/src/llm/mock.ts` — mock de respostas.
- Config:
  - `singularity/tsconfig.json` — TypeScript.
  - `singularity/package.json` — scripts `dev`, `build`, `start`.