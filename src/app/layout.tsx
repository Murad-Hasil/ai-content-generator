// src/app/layout.tsx
// --------------------------------------------------
// Root layout — wraps the entire app with global styles,
// metadata, navbar, footer, and theme support.
// --------------------------------------------------

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

// Font setup
const inter = Inter({ subsets: ["latin"] });

// Global SEO + Open Graph metadata
export const metadata: Metadata = {
  title: "AI Content Generator",
  description: "Instantly generate high-quality blog posts using AI.",
  keywords: ["AI", "blog generator", "content creation", "Next.js", "Gemini"],
  authors: [
    {
      name: "Murad Hasil",
      url: "https://portfolio-nextjs-woad-gamma.vercel.app/",
    },
  ],
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-24x24.png", sizes: "24x24", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      {
        url: "/icons/favicon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        url: "/icons/favicon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        url: "/icons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/icons/favicon-180x180.png",
    other: [
      {
        rel: "manifest",
        url: "/manifest.json",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
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
  metadataBase: new URL("https://ai-content-generator-mu-ten.vercel.app/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        {/* Theme wrapper controls dark/light mode */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Navbar (fixed at top) */}
          <Navbar />

          {/* Main content area */}
          <main className="min-h-screen pt-16 pb-10">{children}</main>

          {/* Footer (bottom section) */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
