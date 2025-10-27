// src/components/ui/use-toast.tsx
// ------------------------------------------------------
// Global Toast Context + Hook
// Lets any component trigger a toast message cleanly.
// ------------------------------------------------------

"use client";

import * as React from "react";
import { ToastProps, Toast } from "@/components/ui/toast";

const ToastContext = React.createContext<{
  toasts: ToastProps[];
  toast: (props: ToastProps) => void;
  dismiss: (id: string) => void;
} | null>(null);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const dismiss = React.useCallback(
    (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)),
    []
  );

  const toast = React.useCallback(
    (props: ToastProps) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { ...props, id }]);
      setTimeout(() => dismiss(id), props.duration || 3000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-[100]">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
