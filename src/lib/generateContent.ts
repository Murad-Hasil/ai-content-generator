// src/lib/generateContent.ts
// ------------------------------------------------------
// Sends topic and tone to the `/api/generate` endpoint
// and returns the generated content.
// Keeps fetch logic isolated from UI components.
// ------------------------------------------------------

export async function generateContent(topic: string, tone: string) {
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, tone }),
    });

    if (!res.ok) {
      throw new Error("Failed to generate content.");
    }

    const data = await res.json();
    return data.content;
  } catch (err) {
    console.error("Error generating content:", err);
    throw err;
  }
}
