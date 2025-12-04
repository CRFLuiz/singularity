## WebSocket Errors

- Invalid JSON: `{ "type":"error", "error":"invalid_json" }`.
- Unsupported message type: `{ "type":"error", "error":"unsupported" }`.
- Fallbacks:
  - PM agent: usa fallback quando falta API key ou ocorre erro no LLM.
  - Default agent: retorna mock em condições equivalentes.

### Referências
- Mensagens e formatos: `../ws/messages.md`.
- Código: `singularity/src/server.ts` e `singularity/src/protocol.ts`.
