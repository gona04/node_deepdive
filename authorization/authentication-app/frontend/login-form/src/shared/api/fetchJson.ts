export async function fetchJson<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    const result = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(
      result?.error ?? `Request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}
