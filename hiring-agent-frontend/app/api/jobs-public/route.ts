export const runtime = "nodejs";

export async function GET(): Promise<Response> {
  try {
    const url = process.env.N8N_JOBS_LIST_URL;
    if (!url) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing server env N8N_JOBS_LIST_URL" }),
        { status: 500, headers: { "content-type": "application/json" } },
      );
    }

    const res = await fetch(url, { method: "GET" });
    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await res.json();
      return new Response(JSON.stringify(data), { status: res.status, headers: { "content-type": "application/json" } });
    }

    const text = await res.text();
    return new Response(text, { status: res.status, headers: { "content-type": contentType || "text/plain" } });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Proxy error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
