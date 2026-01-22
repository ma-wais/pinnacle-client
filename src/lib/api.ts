export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const runtimeBase =
    typeof window !== "undefined" && (window as any).API_BASE
      ? (window as any).API_BASE
      : import.meta.env.VITE_API_URL || "";
  const baseUrl = runtimeBase.replace(/\/+$/, "");
  
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(init?.headers ?? {}),
  };

  const res = await fetch(
    `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`,
    {
      credentials: "include",
      headers,
      ...init,
    },
  );

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
  const runtimeBase =
    typeof window !== "undefined" && (window as any).API_BASE
      ? (window as any).API_BASE
      : import.meta.env.VITE_API_URL || "";
  const baseUrl = runtimeBase.replace(/\/+$/, "");
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  
  const token = localStorage.getItem("token");
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers,
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
