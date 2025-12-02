# Mock

- `generateReply({ chat_id, content })` returns prefix + timestamp — `singularity/src/llm/mock.ts`

- Fallback triggers — `singularity/src/server.ts`:
  - When no `OPENROUTER_API_KEY` is present or the model is unsupported.
  - On LLM error during default agent interaction.
