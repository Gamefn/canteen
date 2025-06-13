export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const targetUrl = "https://kitsu.eu.pythonanywhere.com" + req.url;

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: "kitsu.eu.pythonanywhere.com",
      },
      body: chunks.length > 0 ? Buffer.concat(chunks) : undefined,
    });

    // Set headers
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    const data = await response.arrayBuffer();
    res.status(response.status).send(Buffer.from(data));
  } catch (err) {
    console.error("Proxy error:", err);
