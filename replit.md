# UniFlow — Plateforme Universitaire Intelligente

Application web de gestion universitaire pour les universités camerounaises. Frontend React complet avec données mock, optimisé pour un déploiement Vercel.

## Run & Operate

- `pnpm --filter @workspace/uniflow-web run dev` — run the UniFlow frontend (managed via workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + shadcn/ui
- Charts: Recharts
- Routing: Wouter
- Animations: Framer Motion
- Icons: Lucide React
- Fonts: Plus Jakarta Sans + Inter (Google Fonts)

## Where things live

- `artifacts/uniflow-web/src/pages/` — all 10 pages (Landing, Auth, Dashboard, Students, Courses, Schedule, Attendance, Rooms, Notifications, Settings)
- `artifacts/uniflow-web/src/lib/mock-data.ts` — all mock data
- `artifacts/uniflow-web/src/components/layout/` — Sidebar + AppShell
- `artifacts/uniflow-web/src/index.css` — full theme (dark/light mode, CSS vars)

## Architecture decisions

- Frontend-only: all data is mock (no backend calls), ready to wire to any REST API
- Dark mode by default, togglable from Settings > Apparence
- Sidebar collapsible to icon-only mode (framer-motion animation)
- Wouter for routing — flat Switch in App.tsx, AppShell wraps authenticated routes
- Vercel-ready: static SPA build via `vite build`

## Product

10 pages complètes : Landing page marketing, Authentification multi-rôles, Dashboard avec KPIs et graphiques, Gestion des étudiants, Unités d'Enseignement, Emploi du temps hebdomadaire, Suivi des présences, Gestion des salles, Centre de notifications, Paramètres.

## User preferences

- Frontend uniquement — ne pas ajouter de backend sans instruction explicite
- Données mock dans src/lib/mock-data.ts
- Optimisé pour déploiement Vercel (SPA statique)

## Gotchas

- CSS vars utilisent HSL sans wrapper : `--primary: 221 83% 53%` (pas `hsl(...)`)
- Google Fonts @import doit être LA PREMIÈRE ligne dans index.css
- Wouter : ne pas envelopper les pages dans un Route parent "/" (cela casse la navigation)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
