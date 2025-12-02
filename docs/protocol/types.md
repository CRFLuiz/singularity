# Types

- `IncomingMessage`, `OutgoingMessage` — `singularity/src/protocol.ts`
- Actual shapes:
  - `IncomingMessage`: `{ type: string, chat_id?: string, content?: string, model?: string, agent?: string }` — `singularity/src/protocol.ts`
  - `OutgoingMessage`: `{ type: string, chat_id?: string, content?: string, ok?: boolean, error?: string, model?: string, agent?: string }` — `singularity/src/protocol.ts`
- `Types` constants:
  - `{ ChatMessage: "chat.message", ChatReply: "chat.reply", Ack: "ack", Error: "error", Ping: "ping", Pong: "pong", Models: "models.list" }` — `singularity/src/protocol.ts`
