"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PenLine, FileText } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

/**
 * Main navigation bar
 * - Appears on every page
 * - Highlights the active route
 * - Includes theme toggle
 */
export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-border bg-card/60 backdrop-blur-md"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <PenLine className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg tracking-tight">
            AI Content Generator
          </span>
        </Link>

        {/* Navigation Links + Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Generate Page */}
          <Link href="/">
            <Button
              size="sm"
              variant={pathname === "/" ? "default" : "ghost"}
              className="transition-transform hover:scale-105"
            >
              Generate
            </Button>
          </Link>

          {/* Saved Posts Page */}
          <Link href="/saved-posts">
            <Button
              size="sm"
              variant={pathname === "/saved-posts" ? "default" : "ghost"}
              className="flex items-center transition-transform hover:scale-105"
            >
              <FileText className="h-4 w-4 mr-1" />
              Saved Posts
            </Button>
          </Link>

          {/* Theme Toggle (Light / Dark) */}
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
