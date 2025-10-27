// src/app/saved-posts/page.tsx
// ------------------------------------------------------
// Saved Posts Page
// Displays, edits, shares, and deletes saved AI-generated posts.
// Uses localStorage for persistence and toast for feedback.
// ------------------------------------------------------

"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

type SavedPost = {
  title: string;
  content: string;
  tone: string;
};

export default function SavedPostsPage() {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);
  const { toast } = useToast();

  // Load saved posts from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("savedPosts");
      if (stored) setSavedPosts(JSON.parse(stored));
    } catch {
      console.warn("Failed to parse savedPosts from localStorage.");
      localStorage.removeItem("savedPosts");
    }
  }, []);

  // Save posts safely to localStorage
  const saveToStorage = useCallback(
    (data: SavedPost[]) => {
      try {
        localStorage.setItem("savedPosts", JSON.stringify(data));
      } catch {
        toast({
          description: "Could not save changes locally.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  // Delete post with confirmation
  const handleDelete = useCallback(
    (index: number) => {
      if (pendingDelete === index) {
        const updated = savedPosts.filter((_, i) => i !== index);
        setSavedPosts(updated);
        saveToStorage(updated);
        setPendingDelete(null);
        toast({ description: "Post deleted successfully.", variant: "destructive" });
      } else {
        setPendingDelete(index);
        toast({ description: "Click delete again to confirm.", variant: "destructive" });
        setTimeout(() => setPendingDelete(null), 4000);
      }
    },
    [pendingDelete, savedPosts, toast, saveToStorage]
  );

  // Copy post to clipboard
  const handleShare = useCallback(
    async (content: string) => {
      if (!content?.trim()) {
        toast({ description: "No content to copy.", variant: "destructive" });
        return;
      }

      try {
        await navigator.clipboard.writeText(content);
        toast({ description: "Copied to clipboard!" });
      } catch {
        toast({
          description: "Failed to copy. Please try again.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  // Enable edit mode
  const handleEdit = useCallback(
    (index: number) => {
      setEditingIndex(index);
      setEditedContent(savedPosts[index].content);
    },
    [savedPosts]
  );

  // Save edited content
  const handleSaveEdit = useCallback(
    (index: number) => {
      const updated = [...savedPosts];
      updated[index].content = editedContent.trim();
      setSavedPosts(updated);
      saveToStorage(updated);
      setEditingIndex(null);
      toast({ description: "Post updated successfully." });

      // Smooth scroll to the updated post
      document.getElementById(`post-${index}`)?.scrollIntoView({ behavior: "smooth" });
    },
    [editedContent, savedPosts, saveToStorage, toast]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="max-w-3xl mx-auto px-4 py-10"
    >
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Saved Posts</h1>
        <Link href="/">
          <Button variant="outline">← Back</Button>
        </Link>
      </div>

      {/* Empty State */}
      {savedPosts.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">No saved posts yet.</p>
      ) : (
        <div className="space-y-6">
          {savedPosts.map((post, index) => {
            const isEditing = editingIndex === index;
            const isPendingDelete = pendingDelete === index;

            return (
              <Card
                key={index}
                id={`post-${index}`}
                className="shadow-sm border border-border hover:shadow-md transition"
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="font-medium">{post.title}</span>

                    {/* Post Actions */}
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button size="sm" onClick={() => handleSaveEdit(index)}>
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingIndex(null)}
                          >
                            Cancel
                          </Button>
                        </>
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
                        variant={isPendingDelete ? "destructive" : "default"}
                        onClick={() => handleDelete(index)}
                      >
                        {isPendingDelete ? "Confirm Delete" : "Delete"}
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">
                    Tone: <span className="capitalize">{post.tone}</span>
                  </p>

                  {isEditing ? (
                    <textarea
                      autoFocus
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
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
