// src/app/api/generate/route.ts
// ------------------------------------------------------
// Author: MB
// Purpose: Generate blog content using Google Gemini.
// Receives a topic and tone, builds a natural prompt,
// and returns a plain-text blog post response.
// ------------------------------------------------------

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client with a secure server-side API key.
// Never expose this key in client-side code.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define expected input structure for strong typing.
interface GenerateRequest {
  topic: string;
  tone: string;
}

export async function POST(req: Request) {
  try {
    // Validate Content-Type header (handles charset variations)
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Invalid content type. Expected JSON." },
        { status: 400 }
      );
    }

    const { topic, tone }: GenerateRequest = await req.json();

    // Simple input validation
    if (!topic?.trim() || !tone?.trim()) {
      return NextResponse.json(
        { success: false, error: "Both topic and tone are required." },
        { status: 400 }
      );
    }

    // Normalize tone for consistent prompt wording
    const normalizedTone = tone.toLowerCase().trim();

    // Initialize model once per request
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Construct a clear, human-like writing prompt
    const prompt = `
      Write a well-structured blog post about "${topic}" in a ${normalizedTone} tone.
      The writing should feel natural, coherent, and easy to follow.
      Include an engaging introduction, organized sections, and a short conclusion.
    `.trim();

    // Generate the content
    const result = await model.generateContent(prompt);
    const content = result?.response?.text()?.trim();

    if (!content) {
      return NextResponse.json(
        { success: false, error: "No content was generated." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, content });
  } catch (error: unknown) {
    console.error(
      "[/api/generate] Content generation failed:",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      { success: false, error: "Failed to generate content. Please try again later." },
      { status: 500 }
    );
  }
}
