"use client";

import { motion } from "framer-motion";

/**
 * Footer component
 * Simple, clean, and responsive footer that fades in on load.
 */
export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="border-t border-border bg-card/40 backdrop-blur-sm mt-10"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-6 text-sm text-muted-foreground">
        {/* Left side - copyright */}
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-foreground">AI Content Generator</span>. 
          All rights reserved.
        </p>

        {/* Right side - credit */}
        <p className="text-center sm:text-right">
          Built by{" "}
          <a
            href="https://portfolio-nextjs-woad-gamma.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline transition-colors"
          >
            Murad Hasil
          </a>
        </p>
      </div>
    </motion.footer>
  );
}
