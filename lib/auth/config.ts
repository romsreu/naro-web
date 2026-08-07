// Base URL for the auth service, routed through the API gateway.
// In the real deployment topology, requests go through the gateway at
// :8443 (not directly to auth-service at :8081), so that's the canonical
// default here.
export const AUTH_BASE_URL =
  process.env.AUTH_SERVICE_URL ?? 'http://localhost:8443/auth-service/api/auth'
