# AI Content Generator

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0EA5E9?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

A simple and clean web app that helps you generate high-quality blog posts using AI.  
Built with **Next.js**, **Tailwind CSS**, and **Google Gemini API**, the app supports both light and dark themes and can be installed as a **Progressive Web App (PWA)** for offline access.

---

## ⚙️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Animation:** Framer Motion
- **AI Model:** Google Gemini API
- **Deployment:** Vercel
- **Extras:** TypeScript, PWA support

---

## 🚀 Features

- Generate natural, high-quality content in different tones
- Clean and mobile-friendly UI
- Dark/light theme with system detection
- Saved posts with Edit & Share options
- Offline support (PWA)
- SEO-optimized metadata and Open Graph tags

---

## 🧩 Folder Structure

```
src/
├── app/
│ ├── api/
│ │ └── generate/route.ts → AI generation API route
│ ├── layout.tsx → Root layout with metadata
│ └── page.tsx → Main homepage
├── components/ → UI components (Navbar, Footer, etc.)
├── lib/ → Helper functions
public/
├── icons/ → Favicon files
└── og-image.png → Open Graph image
```
---

## 💻 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Murad-Hasil/ai-content-generator.git
   cd ai-content-generator
   ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3.  **Add environment variables**  

    Create a .env.local file and add:

    ```bash
    GEMINI_API_KEY=your_api_key_here
    ```

4. **Run the development server**

    ```bash
    npm run dev
    ```
5. **Build for production**

    ```bash
    npm run build && npm start
    ```

## 🌐 Deployment

This project is optimized for Vercel.
Once deployed, Lighthouse will recognize the PWA manifest and service worker automatically

---

## 🧠 Live Demo

👉 [AI Content Generator on Vercel](https://ai-content-generator-mu-ten.vercel.app/)

---

## 📱 PWA Support  

You can install the app directly from your browser:

- On desktop, click **“Install App”** or **“Open in App”**
- On mobile, tap **“Add to Home Screen”**  
The app works offline after first load.

##  👤 Author

**Murad Hasil**  
*Portfolio Website:* [Visit My Portfolio](https://personal-portfolio-nextjs-ebon.vercel.app/)

---