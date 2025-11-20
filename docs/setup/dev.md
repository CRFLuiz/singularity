# Dev

- Local:
  - `cd singularity && corepack enable && yarn install`
  - `yarn dev` — `singularity/package.json`
  - `yarn build && yarn start` — `singularity/package.json`
- Compose:
  - `nebulosa-infra/environments/local/docker-compose.yaml`
  - Frontend usa `VITE_SINGULARITY_WS_URL` — `nebulosa-infra/environments/local/docker-compose.yaml`