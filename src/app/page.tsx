// src/app/page.tsx
// ------------------------------------------------------
// Homepage
// Renders the main ContentGenerator component with a smooth
// entry animation for a polished feel.
// ------------------------------------------------------

"use client";

import { motion } from "framer-motion";
import ContentGenerator from "@/components/ContentGenerator";

export default function Home() {
  return (
    <motion.main
      className="px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <ContentGenerator />
    </motion.main>
  );
}
