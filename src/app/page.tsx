// src/app/page.tsx
// ------------------------------------------------------
// Homepage
// Renders the main ContentGenerator with a smooth
// entry animation for a clean first impression.
// ------------------------------------------------------

"use client";

import { motion } from "framer-motion";
import ContentGenerator from "@/components/ContentGenerator";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8"
    >
      {/* SEO-friendly hidden heading */}
      <h1 className="sr-only">AI Content Generator</h1>

      <section className="w-full max-w-5xl">
        <ContentGenerator />
      </section>
    </motion.main>
  );
}
