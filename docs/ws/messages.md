# Messages

- Path: `/ws` — `singularity/src/server.ts`
- Types:
  - `ping` → `pong` — `singularity/src/server.ts`
  - `models.list` → list — `singularity/src/server.ts`
  - `chat.message` → `ack` and `chat.reply` — `singularity/src/server.ts`
  - `error` for unsupported — `singularity/src/server.ts`

- Formats:
  - `ping`: `{ "type": "ping" }` → `{ "type": "pong", "ok": true }` — `singularity/src/server.ts`
  - `models.list`: `{ "type": "models.list" }` → `{ "type": "models.list", "content": "[\"openrouter/sherlock-dash-alpha\",...]" }` — `singularity/src/server.ts`
  - `chat.message`:
    - Request: `{ "type":"chat.message", "chat_id":"<id>", "content":"<text>", "model":"<model?>", "agent":"pm|default?" }` — `singularity/src/protocol.ts`
    - Ack: `{ "type":"ack", "chat_id":"<id>", "ok": true, "model":"<model>", "agent":"<agent?>" }` — `singularity/src/server.ts`
    - Reply: `{ "type":"chat.reply", "chat_id":"<id>", "content":"<reply>", "model":"<model>", "agent":"<agent?>" }` — `singularity/src/server.ts`

- Errors:
  - Invalid JSON: `{ "type":"error", "error":"invalid_json" }` — `singularity/src/server.ts`
  - Unsupported type: `{ "type":"error", "error":"unsupported" }` — `singularity/src/server.ts`

- Fallback behavior — `singularity/src/server.ts`:
  - PM agent: uses PM fallback when API key is missing or on LLM error.
  - Default agent: uses mock reply when API key is missing or on LLM error.
