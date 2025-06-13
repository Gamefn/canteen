module.exports.config = {
  api: {
    bodyParser: false,
  },
};

module.exports.default = async function handler(req, res) {
  const targetUrl = "https://kitsu.eu.pythonanywhere.com" + req.url;

  console.log(`[Proxy] ${req.method} ${req.url}`);

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
        "content-type":
          req.headers["content-type"] || "application/x-www-form-urlencoded",
      },
      body,
    });

    const buffer = await response.arrayBuffer();

    const contentType = response.headers.get("content-type");
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }

    res.status(response.status).send(Buffer.from(buffer));
  } catch (err) {
    console.error("[Proxy Error]", err);
    res.status(500).send("Proxy error");
  }
};
