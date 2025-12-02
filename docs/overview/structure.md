# Structure

- Code:
  - `singularity/src/server.ts` — HTTP and WebSocket server.
  - `singularity/src/protocol.ts` — message types and constants.
  - `singularity/src/agents/*` — OpenRouter, PM, fallback.
  - `singularity/src/llm/mock.ts` — mock responses.
  - `ChatHistory` with up to 24 messages per chat — `singularity/src/server.ts`
- Config:
  - `singularity/tsconfig.json` — TypeScript.
  - `singularity/package.json` — `dev`, `build`, `start` scripts.
