export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, vehicle } = req.body;

  const response = await fetch("https://devcam27.app.n8n.cloud/webhook/8888630f-b51f-472f-b850-2513753716a6", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, vehicle }),
  });

  const data = await response.json();

  return res.status(200).json({ success: true, data });
}
