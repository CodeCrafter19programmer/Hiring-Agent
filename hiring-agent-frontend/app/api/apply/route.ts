export const runtime = "nodejs";

export async function POST(req: Request): Promise<Response> {
  try {
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!n8nWebhookUrl) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing server env N8N_WEBHOOK_URL" }),
        { status: 500, headers: { "content-type": "application/json" } },
      );
    }

    const formData = await req.formData();

    // Basic validation
    const required = ["full_name", "email", "phone", "jobId", "cv_file"];
    for (const field of required) {
      if (!formData.get(field)) {
        return new Response(
          JSON.stringify({ ok: false, error: `Missing field: ${field}` }),
          { status: 400, headers: { "content-type": "application/json" } },
        );
      }
    }

    const forwardRes = await fetch(n8nWebhookUrl, {
      method: "POST",
      body: formData,
    });

    // Try to proxy JSON back; if not JSON, send text
    const contentType = forwardRes.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await forwardRes.json();
      return new Response(JSON.stringify(data), {
        status: forwardRes.status,
        headers: { "content-type": "application/json" },
      });
    } else {
      const text = await forwardRes.text();
      return new Response(text, {
        status: forwardRes.status,
        headers: { "content-type": contentType || "text/plain" },
      });
    }
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || "Proxy error" }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
}
