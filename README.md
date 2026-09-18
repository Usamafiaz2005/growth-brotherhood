# Growth Brotherhood — Agency Site

Marketing site for Growth Brotherhood, built around custom WebGL scenes and
scroll-driven animation instead of a template.

## Live Demo
[add your deployed link here]

## What's real vs. simulated
- ✅ 3D hero scene and scroll-driven sections — React Three Fiber + GSAP + Lenis
- ✅ Lead capture form — sends to a real email endpoint (see `/api/leads`)
- ⚠️ Featured work — includes concept/capability builds clearly marked as such
  in `src/data/projects.ts`; no fabricated client results or testimonials

## Stack
- **Frontend:** Next.js (App Router), React, TypeScript
- **3D/Animation:** React Three Fiber, @react-three/drei, @react-three/rapier, GSAP, Framer Motion, Lenis
- **Styling:** Tailwind CSS

## Architecture note worth knowing
The entry 3D scene and scroll sections are decoupled per-component
(`components/3d/scenes`, `components/sections`) so each animated section can
be iterated on independently without re-touching the scroll orchestration
logic.

## Setup
```bash
npm install
npm run dev
```

Requires `RESEND_API_KEY` and `LEAD_NOTIFY_EMAIL` (or your provider of
choice) in `.env.local` for the lead capture form to work — see
`src/app/api/leads/route.ts`.

## Roadmap
- [ ] Replace email-only lead capture with a persisted database record
- [ ] Add a real, verifiable case study once a live client project ships
