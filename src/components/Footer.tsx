// src/components/Footer.tsx
// ------------------------------------------------------
// Footer Component
// A clean, responsive footer with a soft fade-in animation.
// Displays copyright and developer credit.
// ------------------------------------------------------

"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="border-t border-border bg-card/40 backdrop-blur-sm mt-10"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-6 text-sm text-muted-foreground">
        {/* Left section — copyright */}
        <p className="text-center sm:text-left">
          © {currentYear}{" "}
          <span className="font-medium text-foreground">AI Content Generator</span>.{" "}
          All rights reserved.
        </p>

        {/* Right section — credit */}
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
