# Testing

- URL: `ws://localhost:<port>/ws` — `singularity/src/server.ts`
- Passos:
  - Envie `{"type":"ping"}` → espera `{"type":"pong"}`
  - Envie `{"type":"models.list"}` → retorna lista de modelos
  - Envie `{"type":"chat.message","chat_id":"1","content":"...","agent":"pm"}` → `ack` e depois `chat.reply`