export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_URL || "";
  const res = await fetch(`${baseUrl}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!res.ok) {
    const body = isJson
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    const message =
      (body &&
        typeof body === "object" &&
        "error" in body &&
        (body as any).error) ||
      res.statusText;
    throw new Error(String(message || "Request failed"));
  }

  if (isJson) return (await res.json()) as T;
  return (await res.text()) as unknown as T;
}

export async function apiFetchForm<T>(
  path: string,
  form: FormData,
): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    credentials: "include",
    body: form,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!res.ok) {
    const body = isJson
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    const message =
      (body &&
        typeof body === "object" &&
        "error" in body &&
        (body as any).error) ||
      res.statusText;
    throw new Error(String(message || "Request failed"));
  }

  if (isJson) return (await res.json()) as T;
  return (await res.text()) as unknown as T;
}
