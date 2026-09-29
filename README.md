# Growth Brotherhood — Digital Experiences & Growth Systems

> **"Most agencies build websites. We build digital systems."**  
> An ultra-modern, immersive digital agency platform engineered with dark luxury aesthetics, procedural 3D WebGL scenes, interactive growth analytics, and deterministic conversion architecture.

---

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

---

## ✦ System Overview

**Growth Brotherhood** is a high-performance commercial web application built to serve ambitious brands, luxury services, D2C disruptors, and B2B SaaS platforms. It acts as both a primary client acquisition engine and an interactive showcase of creative technology capabilities.

Every element is intentionally engineered around **conversion psychology**, **sub-second performance**, and **interactive 3D storytelling**.

---

## ✦ Key Architectural Features

### 1. Procedural 3D WebGL Environments (`Three.js` + `React Three Fiber`)
* **Hero Growth Core (`EntryScene.tsx`)**: Concentric counter-rotating orbital rings, inner crystal octahedron with breathing emissive pulse, mouse-tracking camera rig, and an 1,800-particle ambient starfield.
* **Interactive 3D Creative Lab (`/lab`)**: High-fidelity WebGL laboratory with an interactive 3-mode scene explorer:
  * **01 · Case Prototypes**: Interactive floating 3D client deliverables with real-time hover illumination and inspector data cards.
  * **02 · System Galaxy**: Radial 3D orbital model linking all 6 agency service nodes around a central glowing growth engine.
  * **03 · AI Neural Engine**: 3D data pipeline simulation visualizing multi-agent lead intelligence, CRM flows, and intent scoring.
* **Reactive 3D Contact Canvas (`/contact`)**: Form-reactive WebGL canvas that renders 3D browser mockups, neural nets, or particle fields dynamically based on user selections.

### 2. Deterministic Growth Assessor (`GrowthSimulator.tsx`)
* An interactive diagnostic tool that analyzes business industry, current digital presence, and growth targets.
* Features a simulated 4-step market diagnostic scan with progress bars, returning deterministic opportunity scoring, schema gap detection, and actionable conversion roadmaps.

### 3. Procedural Web Audio Synthesizer (`SoundSystem.tsx`)
* Built natively on the **HTML5 Web Audio API** with zero audio file downloads or latency.
* Procedural oscillator synthesis generating tactile, high-frequency sine chimes (440Hz $\rightarrow$ 880Hz) on hover and triangle clicks on action triggers when sound is enabled.

### 4. Custom Magnetic Trailing Cursor (`CustomCursor.tsx`)
* Inertial physics trailing ring with dual-state center positioning.
* Context-aware state triggers (`VIEW ↗`, `EXPLORE`, `ENTER →`, `DRAG`) mapped via `data-cursor` attributes.
* Graceful degradation: automatically disabled on touch devices and `prefers-reduced-motion`.

### 5. Multi-Step Onboarding Funnel (`/contact`)
* Guided client qualification funnel (`Name` $\rightarrow$ `Business` $\rightarrow$ `Website` $\rightarrow$ `Needs` $\rightarrow$ `Budget` $\rightarrow$ `Timeline` $\rightarrow$ `Message` $\rightarrow$ `Email`).
* Includes step memory and previous step navigation with submission to the `/api/leads` endpoint.

### 6. Dynamic Case Study Engine (`/work` & `/work/[slug]`)
* Static Site Generation (`generateStaticParams`) with rich metadata and SEO markup.
* Verified client transformations (*Asset Care London*, *AI Client Hunter System*, *Precision D2C Engine*).
* Responsive metric grid with sequential continuous project routing.

### 7. Self-Hosted Social Bio Portal (`/links`)
* High-conversion, branded link portal for social media bios (LinkedIn, X, Instagram) routing high-intent prospects directly into priority agency funnels.

---

## ✦ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16.3.0 (App Router), React 19.2.8 |
| **Language** | TypeScript 5 (Strict Mode) |
| **3D & WebGL** | Three.js 0.185, `@react-three/fiber` 9.7, `@react-three/drei` 10.7, `@react-three/rapier` 2.2 |
| **Styling** | Tailwind CSS v4, PostCSS, Custom CSS Variables |
| **Animation** | Framer Motion 11, GSAP 3, `@gsap/react` |
| **Smooth Scroll** | Lenis 1.3.26 |
| **Audio** | HTML5 Web Audio API (Procedural Synthesizer) |
| **Icons** | Lucide React |

---

## ✦ Project Structure

```
growth-brotherhood/
├── public/                     # Static assets, favicons, metadata
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/              # Agency philosophy & 3D build process
│   │   ├── api/leads/          # Lead capture serverless endpoint
│   │   ├── contact/            # Multi-step 3D inquiry funnel
│   │   ├── lab/                # Interactive 3D WebGL laboratory (LabClient)
│   │   ├── links/              # Branded social bio hub
│   │   ├── services/           # 6-pillar capabilities breakdown
│   │   ├── work/               # Portfolio showcase & index
│   │   │   └── [slug]/         # Dynamic SSG case study pages
│   │   ├── globals.css         # Design tokens, themes & resets
│   │   ├── layout.tsx          # Root layout with cursor, audio, scroll
│   │   ├── not-found.tsx       # Custom 404 page
│   │   └── page.tsx            # Main homepage
│   ├── components/
│   │   ├── 3d/scenes/          # WebGL 3D scenes (Entry, Lab, World, AI)
│   │   ├── audio/              # Web Audio procedural sound synthesizer
│   │   ├── cursor/             # Magnetic trailing cursor
│   │   ├── layout/             # Universal Footer
│   │   ├── navigation/         # Glassmorphic Navbar & drawer
│   │   ├── providers/          # Lenis smooth scroll provider
│   │   ├── sections/           # Modular homepage sections
│   │   ├── ui/                 # TiltCard, RevealOnScroll, ScrollProgress
│   │   └── utils/              # ConsoleFilter (hydration & extension cleaner)
│   ├── data/                   # Static project & service data models
│   └── types/                  # TypeScript interface definitions
├── next.config.ts              # Transpile packages & security headers
├── tailwind.config.ts          # Custom design system tokens
└── tsconfig.json               # Path aliases (@/*) & TypeScript config
```

---

## ✦ Design System Tokens

```css
/* Palette */
--gb-black:          #0a0908;   /* Deep obsidian background */
--gb-charcoal:       #111110;   /* Surface layer 1 */
--gb-charcoal-2:     #1a1918;   /* Surface layer 2 */
--gb-charcoal-3:     #252422;   /* Surface layer 3 */
--gb-copper:         #C97B3A;   /* Primary luxury metallic accent */
--gb-copper-light:   #E8893A;   /* Active / hover metallic glow */
--gb-offwhite:       #F5F0E8;   /* High-contrast typography */
--gb-offwhite-muted: #B8B0A4;   /* Secondary reading typography */
--gb-teal:           #2DD4BF;   /* High-tech & AI pipeline accent */
--gb-teal-dark:      #0D9488;   /* Muted teal base */
```

---

## ✦ Getting Started

### Prerequisites
* **Node.js** 20.x or higher
* **npm**, **yarn**, or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/Usamafiaz2005/growth-brotherhood.git

# Navigate to project directory
cd growth-brotherhood

# Install dependencies
npm install
```

### Development Server

Run the development server using Webpack bundling (optimized for Three.js shaders and React 19):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## ✦ Vercel Deployment

This project is fully optimized for continuous deployment on **Vercel**.

1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Configure project settings:
   * **Framework Preset**: `Next.js`
   * **Root Directory**: Set to `growth-brotherhood` (if repository root contains the subfolder) or `./`
   * **Build Command**: `next build --webpack` (default npm run build)
   * **Install Command**: `npm install`
3. Click **Deploy**.

> [!NOTE]
> The lead capture endpoint at `/api/leads` writes locally to `leads.json` in development. For production Vercel serverless environments, connect a webhook (e.g. Slack / Discord / Resend / CRM) or a hosted database (Supabase / Postgres / Firebase) for persistent lead delivery.

---

## ✦ License & Ownership

Copyright © 2026 **Growth Brotherhood Ltd**. All Rights Reserved.  
Proprietary creative technology and design system architecture.
