# PM Fallback

- Structured questions based on user context — `singularity/src/agents/pm_fallback.ts`

- Fallback triggers — `singularity/src/server.ts`:
  - When no `OPENROUTER_API_KEY` is present or the model is unsupported.
  - On LLM error during PM interaction.
