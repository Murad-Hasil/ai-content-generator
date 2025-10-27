// src/lib/generateContent.ts
// ------------------------------------------------------
// Handles content generation by sending a POST request
// to the `/api/generate` endpoint with the topic and tone.
// Includes timeout and error handling.
// ------------------------------------------------------

interface GenerateResponse {
  content?: string;
}

export async function generateContent(topic: string, tone: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, tone }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data: GenerateResponse = await res.json();
    return data.content?.trim() || "No content generated.";
  } catch (err) {
    console.error("Error generating content:", err);
    return "Sorry, something went wrong while generating content.";
  }
}
