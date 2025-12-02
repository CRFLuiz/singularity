# PM

- Creation: `createPM(model)` — `singularity/src/agents/pm.ts`
- Execution: `runPM(llm, userText)` — `singularity/src/agents/pm.ts`

- System policy — `singularity/src/agents/pm.ts`:
  - Align understanding and avoid assumptions.
  - Ask objective questions until information is consolidated.
  - Only produce final JSON when everything is confirmed.
  - Do not suggest implementation without explicit user request.
