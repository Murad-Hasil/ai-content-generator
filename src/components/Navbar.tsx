// src/components/Navbar.tsx
// -----------------------------------------------------------
// Author: MB
// Purpose: Responsive site header with logo, navigation links,
// and theme toggle. Supports mobile menu and active route highlight.
// -----------------------------------------------------------

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PenLine, FileText, ArrowLeft, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

// Define navigation links once to avoid re-creation on every render
const NAV_LINKS = [
  { label: "Generate", href: "/", icon: null },
  {
    label: "Saved Posts",
    href: "/saved-posts",
    icon: <FileText className="h-4 w-4 mr-1" />,
  },
  {
    label: "Portfolio",
    href: "https://personal-portfolio-nextjs-ebon.vercel.app/",
    icon: <ArrowLeft className="h-4 w-4" />,
    external: true,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Automatically close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const variant = isActive ? "default" : "ghost";

            const button = (
              <Button
                size="sm"
                variant={link.external ? "outline" : variant}
                className="flex items-center gap-1 transition-transform hover:scale-105"
              >
                {link.icon}
                {link.label}
              </Button>
            );

            return link.external ? (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {button}
              </Link>
            ) : (
              <Link key={link.label} href={link.href}>
                {button}
              </Link>
            );
          })}

          <ThemeToggle />
        </div>

        {/* Mobile Menu Button + Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 py-3 space-y-2 shadow-lg"
          >
            {NAV_LINKS.map((link, index) => {
              const isActive = pathname === link.href;

              const button = (
                <Button
                  size="sm"
                  variant={link.external ? "outline" : isActive ? "default" : "ghost"}
                  className="w-full justify-start flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Button>
              );

              return (
                <motion.div
                  key={link.label}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 * index }}
                >
                  {link.external ? (
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {button}
                    </Link>
                  ) : (
                    <Link href={link.href}>{button}</Link>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
