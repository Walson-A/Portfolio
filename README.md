# ⚡ Walson's Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

**The source code of my personal portfolio. An interactive showcase of my skills in software engineering, UI/UX design, and Artificial Intelligence.**

[Live Demo](https://walsondev.com)

</div>

---

## ✨ About This Project

This repository hosts the source code for my professional portfolio. More than just a showcase, this project was designed as a technical demonstration of my ability to build modern, high-performance, and intelligent web applications.

This is a **unique piece** reflecting my visual and technical identity.

---

## 💎 Key Features

### 🧠 AtlasBot (Personal AI Assistant)
At the heart of the portfolio lies **AtlasBot**, a conversational agent with contextual intelligence.
- **RAG Architecture (Retrieval-Augmented Generation)**: AtlasBot queries a vector knowledge base generated dynamically from the site's data.
- **Cloud-Powered Intelligence**: Optimized for **Vercel**, it uses **OpenRouter** for LLM inference (`xiaomi/mimo-v2-flash:free`) and embedding generation (`text-embedding-3-small`).
- **Resilience**: Implements retry mechanisms and fine-grained error handling (rate limiting) for a seamless experience.

### 🎨 User Experience (UX/UI)
- **"Dark Premium" Design System**: A sleek, dark aesthetic punctuated by the signature `#4FD1C5` (Teal) color.
- **Cinematic Timeline**: A reimagining of the classic CV presentation with fluid navigation.
- **Micro-interactions**: Seamless transitions and micro-animations powered by **Framer Motion**.

### ✉️ Contact System
- **Resend Integration**: A reliable and secure contact form powered by **Resend** for professional email delivery.
- **Bot Protection**: Includes a honeypot system and server-side rate-limiting to prevent spam.

### 🛠️ Technical Excellence
- **Next.js 15 (Turbopack)**: Maximum performance with React Server Components (RSC) and ultra-fast compilation.
- **Type Safety**: Enhanced robustness through 100% TypeScript coverage.
- **Vercel Native**: Optimized for serverless deployments (no heavy local dependencies).

---

## 🚀 Installation & Maintenance

### 1. Installation
```bash
npm install
```

### 2. Configuration (`.env.local`)
```env
OPENROUTER_API_KEY=your_openrouter_key_here
RESEND_API_KEY=your_resend_key_here

# Optional:
OPENROUTER_MODEL=xiaomi/mimo-v2-flash:free
```

### 3. "Training" the Chatbot (RAG)
If you modify data in `src/data/projects.ts` or `timeline.ts`, you must re-generate the vector index:
```bash
npm run build-knowledge
```

---

## 📂 Project Architecture

```bash
src/
├── app/                 # Next.js App Router Architecture
├── components/          # Component Library (Design System & Features)
├── data/               # Source of Truth & Knowledge Base (MD + JSON Vectors)
├── lib/                # Business Logic (Embeddings, Retries)
└── scripts/            # Automation Tools (RAG Generation)
```

---

## License

This code is the intellectual property of **Walson Argan RENE**.
The design, contents, and personal assets are not open-sourced for reuse without explicit agreement.

---

<div align="center">
Made with ❤️ and a lot of ☕ by <a href="https://github.com/walson-a">Walson</a>
</div>
