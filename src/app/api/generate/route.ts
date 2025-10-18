// src/app/api/generate/route.ts
// ------------------------------------------------------
// API route: Generates blog content using Google Gemini.
// Receives a topic and tone, builds a natural prompt,
// and returns a plain-text blog post.
// ------------------------------------------------------

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client with your environment key.
// Always keep this key server-side only.
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { topic, tone } = await req.json();

    if (!topic || !tone) {
      return NextResponse.json(
        { error: "Both topic and tone are required." },
        { status: 400 }
      );
    }

    // Use a lightweight Gemini model for faster results
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Write a complete blog post about "${topic}" in a ${tone} tone.
      Make it natural, well-structured, and easy to follow.
      Include a brief introduction, clear sections, and a short conclusion.
    `;

    const result = await model.generateContent(prompt);
    const content = result.response.text();

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}
