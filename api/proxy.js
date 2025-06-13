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

    const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: "kitsu.eu.pythonanywhere.com",
      },
      body,
    });

    const buffer = await response.arrayBuffer();

    // Set content-t
