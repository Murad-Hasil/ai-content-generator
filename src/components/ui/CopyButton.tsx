// src/components/ui/CopyButton.tsx
// ------------------------------------------------------
// Reusable Copy Button
// Copies provided text to clipboard and shows feedback via toast.
// Can be dropped anywhere you want quick copy functionality.
// ------------------------------------------------------

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string; // text to copy
  label?: string; // optional custom button label
}

export default function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Prevent copying if there's no text
    if (!text?.trim()) {
      toast({ description: "No text to copy.", variant: "destructive" });
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ description: "Copied to clipboard!" });

      // revert icon/text after short delay
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        description: "Failed to copy text.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      aria-label={copied ? "Copied" : `Copy ${label}`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {label}
    </Button>
  );
}
