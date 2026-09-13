import type { HealthResponse } from '@virtual-russia/contracts';
const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';
export async function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const response = await fetch(`${baseUrl}/health`, {
    signal,
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Health request failed');
  return response.json() as Promise<HealthResponse>;
}
