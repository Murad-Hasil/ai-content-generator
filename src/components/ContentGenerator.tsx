// src/components/ContentGenerator.tsx
// ------------------------------------------------------
// Main content generation component
// Handles topic and tone input, API call to generate text,
// and local actions (copy, save, view).
// ------------------------------------------------------

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { generateContent } from "@/lib/generateContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy, Save } from "lucide-react";

export default function ContentGenerator() {
  // Local state
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("informative");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  // Generate content from the API
  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic first.");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const content = await generateContent(topic, tone);
      setOutput(content);
    } catch {
      alert("Something went wrong while generating content.");
    } finally {
      setLoading(false);
    }
  };

  // Copy generated content
  const handleCopy = () => {
    if (!output.trim()) return;
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard.");
  };

  // Save post in localStorage
  const handleSave = () => {
    if (!output.trim()) {
      alert("No content to save.");
      return;
    }

    const newPost = { title: topic, content: output, tone };
    const stored = localStorage.getItem("savedPosts");
    const posts = stored ? JSON.parse(stored) : [];

    posts.unshift(newPost);
    localStorage.setItem("savedPosts", JSON.stringify(posts));

    alert("Post saved successfully.");
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="shadow-sm border border-border/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            ✍️ AI Blog Post Generator
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Topic input */}
          <Input
            placeholder="Enter your blog topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          {/* Tone selector */}
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="informative">Informative</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="funny">Funny</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
            </SelectContent>
          </Select>

          {/* Generate button */}
          <Button className="w-full" onClick={handleGenerate} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Content"
            )}
          </Button>

          {/* Output text area */}
          <Textarea
            placeholder="Your generated blog post will appear here..."
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            rows={10}
          />

          {/* Action buttons */}
          {output && (
            <motion.div
              className="flex flex-wrap gap-3 justify-between pt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Button variant="outline" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>

              <Button variant="secondary" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Save Post
              </Button>

              <Link href="/saved-posts">
                <Button variant="default">View Saved</Button>
              </Link>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
