# Dev

- Local:
  - `cd singularity && corepack enable && yarn install`
  - `yarn dev` — `singularity/package.json`
  - `yarn build && yarn start` — `singularity/package.json`
  - Requirements: Node 20+ — Compose uses `node:20-alpine` — `nebulosa-infra/environments/local/docker-compose.yaml`
  - Alternative: `yarn local` (installs deps and runs dev) — `singularity/package.json`
- Compose:
  - `nebulosa-infra/environments/local/docker-compose.yaml`
  - Frontend uses `VITE_SINGULARITY_WS_URL` — `nebulosa-infra/environments/local/docker-compose.yaml`
  - TLS/HTTPS: via Nginx, clientes web devem usar `wss://<domínio>/singularity/ws`.
  - Server port: `SINGULARITY_PORT` define a porta interna do serviço.
