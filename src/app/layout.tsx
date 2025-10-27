// src/app/layout.tsx
// --------------------------------------------------
// Root Layout
// Wraps the entire app with global styles, metadata,
// navigation, footer, theme, and toast support.
// --------------------------------------------------

import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ui/use-toast";

const inter = Inter({ subsets: ["latin"] });

// --------------------------------------------------
// Global SEO + Open Graph Metadata
// --------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL("https://ai-content-generator-mu-ten.vercel.app"),
  title: "AI Content Generator",
  description: "Instantly generate high-quality blog posts using AI.",
  keywords: ["AI", "blog generator", "content creation", "Next.js", "Gemini"],
  authors: [
    {
      name: "Murad Hasil",
      url: "https://personal-portfolio-nextjs-ebon.vercel.app/",
    },
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://ai-content-generator-mu-ten.vercel.app/" },
  openGraph: {
    title: "AI Content Generator",
    description: "Create engaging blog content in seconds with AI.",
    url: "https://ai-content-generator-mu-ten.vercel.app/",
    siteName: "AI Content Generator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Content Generator preview image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Content Generator",
    description: "Generate professional blog posts instantly with AI.",
    creator: "@mbmuradhasil",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/icons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/icons/favicon-180x180.png",
    other: [{ rel: "manifest", url: "/manifest.json" }],
  },
};

// --------------------------------------------------
// Viewport (Next.js 15 syntax)
// --------------------------------------------------
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// --------------------------------------------------
// Root Layout Component
// --------------------------------------------------
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground antialiased transition-colors duration-300`}
      >
        {/* Global Providers: Theme + Toast */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main
              className="
                min-h-screen
                pt-20 pb-12
                px-4 sm:px-6 lg:px-8
                space-y-8
              "
            >
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
