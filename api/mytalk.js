const ALLOWED_ACTIONS = new Set([
  "ask_questions",
  "review_expression",
  "score_expression"
]);

async function requestBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body === "string") return JSON.parse(request.body);

  let raw = "";
  for await (const chunk of request) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

module.exports = async (request, response) => {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const endpoint = process.env.MIAODA_API_URL;
  const apiKey = process.env.MIAODA_API_KEY;
  if (!endpoint || !apiKey) {
    return response.status(503).json({ error: "AI service is not configured" });
  }

  let payload;
  try {
    payload = await requestBody(request);
  } catch {
    return response.status(400).json({ error: "Request body must be valid JSON" });
  }

  if (!ALLOWED_ACTIONS.has(payload?.action) || !payload?.context || typeof payload.context !== "object") {
    return response.status(400).json({ error: "Unsupported AI action or invalid context" });
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        action: payload.action,
        context: payload.context
      })
    });

    const text = await upstream.text();
    const data = text ? JSON.parse(text) : {};
    return response.status(upstream.status).json(data);
  } catch (error) {
    console.error("MyTalk AI proxy failed", error);
    return response.status(502).json({ error: "AI service request failed" });
  }
};
