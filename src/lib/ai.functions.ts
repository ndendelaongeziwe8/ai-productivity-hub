import { createServerFn } from "@tanstack/react-start";

type Msg = { role: "system" | "user" | "assistant"; content: string };

export const aiComplete = createServerFn({ method: "POST" })
  .inputValidator((data: { messages: Msg[]; model?: string }) => {
    if (!Array.isArray(data?.messages)) throw new Error("messages required");
    return data;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: data.model || "google/gemini-3-flash-preview",
        messages: data.messages,
      }),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("Rate limit exceeded. Try again shortly.");
      if (res.status === 402) throw new Error("AI credits exhausted. Add funds in Workspace Settings.");
      const t = await res.text();
      console.error("AI gateway error", res.status, t);
      throw new Error("AI request failed");
    }

    const json = await res.json();
    const content: string = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });