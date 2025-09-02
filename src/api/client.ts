const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function http<T>(
  path: string,
  options?: RequestInit & { parse?: "json" | "text" }
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,

  });


  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `HTTP ${res.status}`);
  }



  const parseAs = options?.parse ?? "json";
  // @ts-expect-error runtime parse switch
  return parseAs === "json" ? res.json() : res.text();

}



/** For endpoints that return a list + x-total-count header (supports _page & _limit) */

export async function httpPaginated<T>(
  path: string
): Promise<{ data: T[]; total: number }> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },

  });



  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `HTTP ${res.status}`);

  }

  const totalHeader = res.headers.get("x-total-count");
  const total = totalHeader ? parseInt(totalHeader, 10) : 0;
  const data: T[] = await res.json();
  return { data, total };

}

