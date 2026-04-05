# magister1o Portfolio

A personal portfolio website for Bogdan (magister1o), a 17-year-old full-stack developer from Brest, Belarus.

## Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **State**: TanStack Query
- **Icons**: Lucide React + React Icons

## Structure

```
src/
  App.tsx          - Root app with routing
  main.tsx         - Entry point
  index.css        - Global styles
  pages/
    Index.tsx      - Main portfolio page
    PcBusiness.tsx - PC Business page
    NotFound.tsx   - 404 page
  components/
    Navbar.tsx
    HeroSection.tsx
    AboutSection.tsx
    SkillsSection.tsx
    ProjectsSection.tsx
    Footer.tsx
    ui/            - shadcn/ui components
  hooks/
    use-mobile.tsx
    use-toast.ts
  lib/
    utils.ts
```

## Running

```bash
npm run dev    # Start dev server on port 5000
npm run build  # Build for production
```

## Notes

- Migrated from Lovable to Replit — `lovable-tagger` plugin removed from vite.config.ts
- Pure frontend static app, no backend needed
- Dev server runs on port 5000 (Replit webview)
