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
  - TLS/HTTPS note: in local infra, WS may be proxied as `wss://` — see nginx service — `nebulosa-infra/environments/local/docker-compose.yaml`
