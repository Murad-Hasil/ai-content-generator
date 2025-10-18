"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

// Type definition for a single saved post entry
type SavedPost = {
  title: string;
  content: string;
  tone: string;
};

export default function SavedPostsPage() {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");

  // Load saved posts from localStorage when the component mounts
  useEffect(() => {
    const stored = localStorage.getItem("savedPosts");
    if (stored) setSavedPosts(JSON.parse(stored));
  }, []);

  // Delete a post after confirming with the user
  const handleDelete = (index: number) => {
    if (!window.confirm("Delete this post permanently?")) return;
    const updated = savedPosts.filter((_, i) => i !== index);
    setSavedPosts(updated);
    localStorage.setItem("savedPosts", JSON.stringify(updated));
  };

  // Copy a post's content to clipboard
  const handleShare = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      alert("Post copied to clipboard!");
    } catch {
      alert("Could not copy text. Please try again.");
    }
  };

  // Switch the selected post into edit mode
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedContent(savedPosts[index].content);
  };

  // Save changes made to a post
  const handleSaveEdit = (index: number) => {
    const updated = [...savedPosts];
    updated[index].content = editedContent.trim();
    setSavedPosts(updated);
    localStorage.setItem("savedPosts", JSON.stringify(updated));
    setEditingIndex(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="max-w-3xl mx-auto px-4 py-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Saved Posts</h1>
        <Link href="/">
          <Button variant="outline">← Back to Generator</Button>
        </Link>
      </div>

      {/* If no posts are saved */}
      {savedPosts.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">
          No saved posts yet.
        </p>
      ) : (
        <div className="space-y-6">
          {savedPosts.map((post, index) => (
            <Card
              key={index}
              className="shadow-sm border border-border transition hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="font-medium">{post.title}</span>

                  {/* Actions: Edit / Save / Share / Delete */}
                  <div className="flex gap-2">
                    {editingIndex === index ? (
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(index)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleShare(post.content)}
                    >
                      Share
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Tone: <span className="capitalize">{post.tone}</span>
                </p>

                {/* Show textarea when editing, otherwise show content */}
                {editingIndex === index ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-32 p-2 text-sm border rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="whitespace-pre-wrap leading-relaxed text-sm">
                    {post.content}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}
