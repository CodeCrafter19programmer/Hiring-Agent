export async function sendWebhook(payload) {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) return { ok: false, skipped: true };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return { ok: res.ok };
}
