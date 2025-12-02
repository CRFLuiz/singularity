# Testing

- URL: `ws://localhost:<port>/ws` — `singularity/src/server.ts`
- Steps:
  - Send `{"type":"ping"}` → expect `{"type":"pong","ok":true}`
  - Send `{"type":"models.list"}` → returns models list
  - Send `{"type":"chat.message","chat_id":"1","content":"Hello","agent":"pm"}` → `ack` then `chat.reply`

- Examples:
  - Ping:
    - Request: `{"type":"ping"}`
    - Reply: `{"type":"pong","ok":true}` — `singularity/src/server.ts`
  - List models:
    - Request: `{"type":"models.list"}`
    - Reply: `{"type":"models.list","content":"[\"openrouter/sherlock-dash-alpha\",...]"}` — `singularity/src/server.ts`
  - Chat (PM):
    - Request: `{"type":"chat.message","chat_id":"1","content":"I want to understand the project","agent":"pm"}`
    - Ack: `{"type":"ack","chat_id":"1","ok":true,"model":"openrouter/sherlock-dash-alpha","agent":"pm"}` — `singularity/src/server.ts`
    - Reply: `{"type":"chat.reply","chat_id":"1","content":"...","model":"openrouter/sherlock-dash-alpha","agent":"pm"}` — `singularity/src/server.ts`
