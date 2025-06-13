export default async function handler(req, res) {
  const response = await fetch("https://kitsu.eu.pythonanywhere.com" + req.url);
  const data = await response.text();

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(data);
}
