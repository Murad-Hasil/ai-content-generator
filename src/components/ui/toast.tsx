// src/components/ui/toast.tsx
// ------------------------------------------------------
// Toast UI component
// Displays a brief message with optional title, description,
// and close button. Used by ToastProvider.
// ------------------------------------------------------

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  duration?: number;
  variant?: "default" | "destructive";
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  variant = "default",
  onClose,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className={`rounded-lg p-4 shadow-md border text-sm pointer-events-auto ${
          variant === "destructive"
            ? "bg-red-600 text-white border-red-700"
            : "bg-background text-foreground border-border"
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            {title && <p className="font-medium leading-none">{title}</p>}
            {description && <p className="text-sm opacity-90">{description}</p>}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-3 text-xs opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close toast"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
