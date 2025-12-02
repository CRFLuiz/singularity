# Padrões (Singularity)

- Indexação por tópicos (overview, setup, ws, agents, protocol, environment).
- Arquivos principais: `src/server.ts`, `src/protocol.ts`, `src/agents/*`.
- Mensagens WS padronizadas: `chat.message`, `ack`, `chat.reply`, `models.list`, `ping`, `pong`, `error`.
- Env explícitas: `SINGULARITY_PORT`, `OPENROUTER_API_KEY`, `OPENROUTER_BASE_URL`.
