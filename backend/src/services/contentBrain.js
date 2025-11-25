import OpenAI from "openai";

let openai;
function getOpenAI() {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

export async function generateNarrative(recos) {
  const client = getOpenAI();
  const prompt = `You are a crisp, deterministic analytics coach.\n\nGiven this JSON of recommendations, write:\n- A 4-6 sentence summary\n- 5 prioritized actions\n- 3 content ideas grounded in themes\n\nReturn strictly JSON with keys: {\n  "summary": string,\n  "actions": string[],\n  "contentIdeas": string[]\n}\nDo not add explanations or code fences.\n\nDATA:\n${JSON.stringify(recos).slice(0, 12000)}\n`;

  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });
  const raw = resp.choices?.[0]?.message?.content?.trim() || "{}";
  // Strip common code fences if present
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "");
  try {
    return JSON.parse(cleaned);
  } catch {
    return { summary: cleaned, actions: [], contentIdeas: [] };
  }
}

export async function askWithContext(question, recos) {
  const client = getOpenAI();
  const brand = process.env.BRAND_NAME || "CreatorPulse";
  const system = `You are ${brand}, the creator analytics copilot. Speak as "we" in a friendly, confident, and concise tone.\nStyle:\n- Lead with the answer; avoid generic greetings.\n- Be actionable: numbered steps, bullets, concrete time windows.\n- Reference the user's data when possible (posting windows, platform focus, alerts, themes).\n- If data is insufficient, say so and suggest how to collect it (what to upload).\n- Keep responses tight; avoid long preambles.\n- No legal/medical/financial advice; analytics only.`;
  const user = `Context (truncated JSON):\n${JSON.stringify(recos).slice(0, 12000)}\n\nUser question: ${question}`;
  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.2,
  });
  return resp.choices?.[0]?.message?.content?.trim() || "";
}
