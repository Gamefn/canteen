export const config = {
  api: {
    bodyParser: false, // we will handle the body ourselves
  },
};

export default async function handler(req, res) {
  const targetUrl = "https://kitsu.eu.pythonanywhere.com" + req.url;

  const headers = { ...req.headers };
  delete headers.host; // prevent host mismatch

  const fetchOptions = {
    method: req.method,
    headers,
    redirect: "follow",
  };

  // Only forward body for POST/PUT/etc
  if (req.method !== "GET" && req.method !== "HEAD") {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    fetchOptions.body = Buffer.concat(chunks);
  }

  try {
    const response = await fetch(targetUrl, fetchOptions);

    // copy response headers
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    res.status(response.status);
    response.body.pipe(res);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  }
}
