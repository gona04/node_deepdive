export async function fetchJson<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const headers = new Headers(options?.headers);
  if (!headers.has("Something")) {
    headers.set("Somthing", "Do something");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const result = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(
      result?.error ?? `Request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}
