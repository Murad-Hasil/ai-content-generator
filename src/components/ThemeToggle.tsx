// src/components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch on first render
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = theme === "light";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="relative overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isLight ? "moon" : "sun"}
          initial={{ y: -10, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 10, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2 }}
        >
          {isLight ? (
            <Moon className="h-5 w-5 text-foreground" />
          ) : (
            <Sun className="h-5 w-5 text-foreground" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
