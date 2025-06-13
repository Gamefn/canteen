export default async function handler(req, res) {
  const targetUrl = "https://kitsu.eu.pythonanywhere.com" + req.url;

  const response = await fetch(targetUrl, {
    method: req.method,
    headers: {
      ...req.headers,
      host: "kitsu.eu.pythonanywhere.com"
    },
    body: req.method !== "GET" && req.method !== "HEAD"
      ? req.body ?? null
      : undefined,
    redirect: "follow"
  });

  const contentType = response.headers.get("content-type");
  if (contentType) res.setHeader("Content-Type", contentType);

  const data = await response.arrayBuffer();
  res.status(response.status).send(Buffer.from(data));
}
