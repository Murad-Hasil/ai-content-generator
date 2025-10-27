// src/components/ContentGenerator.tsx
// ------------------------------------------------------
// Author: MB
// Purpose: Main Content Generator Component
// Lets users enter a topic, choose tone, generate content,
// copy or save it, and reset everything.
// ------------------------------------------------------

"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateContent } from "@/lib/generateContent";
import { useToast } from "@/components/ui/use-toast";
import CopyButton from "@/components/ui/CopyButton";

export default function ContentGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Generate content via API
  const handleGenerate = useCallback(async () => {
    if (!topic.trim() || !tone.trim()) {
      toast({
        title: "Missing input",
        description: "Please enter a topic and select a tone first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setContent(""); // clear old result

    try {
      const result = await generateContent(topic, tone);
      setContent(result);

      toast({
        title: "Done!",
        description: "Your AI-generated content is ready.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Could not generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [topic, tone, toast]);

  // Save post to localStorage
  const handleSave = useCallback(() => {
    if (!content.trim() || !topic.trim()) {
      toast({
        title: "Nothing to save",
        description: "Generate some content first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const newPost = { title: topic.trim(), content: content.trim(), tone };
      const existing = JSON.parse(localStorage.getItem("savedPosts") || "[]");
      localStorage.setItem("savedPosts", JSON.stringify([...existing, newPost]));

      toast({
        title: "Saved",
        description: "Added to your Saved Posts.",
      });
    } catch {
      toast({
        title: "Storage Error",
        description: "Could not save post locally.",
        variant: "destructive",
      });
    }
  }, [content, topic, tone, toast]);

  // Clear form and result
  const handleClear = useCallback(() => {
    if (!topic && !tone && !content) {
      toast({ description: "Nothing to clear." });
      return;
    }

    setTopic("");
    setTone("");
    setContent("");

    toast({
      title: "Cleared",
      description: "Form and content reset.",
    });
  }, [topic, tone, content, toast]);

  // UI
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>AI Content Generator</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Topic Input */}
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your blog topic..."
            disabled={loading}
          />

          {/* Tone Selector */}
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger disabled={loading}>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="informative">Informative</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="fun">Fun</SelectItem>
            </SelectContent>
          </Select>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? "Generating..." : "Generate"}
            </Button>
            <Button
              onClick={handleSave}
              variant="secondary"
              disabled={!content || loading}
            >
              Save
            </Button>
            <Button onClick={handleClear} variant="outline" disabled={loading}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {content && (
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Generated Content</CardTitle>
            <CopyButton text={content} />
          </CardHeader>

          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {content}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
