// src/components/ThemeProvider.tsx
// ------------------------------------------------------
// Theme Provider Component
// Enables dark, light, and system themes across the app
// using next-themes. Must wrap the root layout.
// ------------------------------------------------------

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class" // ensures Tailwind dark mode works
      defaultTheme="system" // fallbacks to system preference
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
