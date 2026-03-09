# Aiden Wang Portfolio Website

## Overview
A professional portfolio website for Aiden Wang, an 8th grade CS3 student applying for computer science scholarships. Multi-page application with smooth scrolling, dark/light mode toggle, and fully responsive design.

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion
- **UI Components:** shadcn/ui
- **3D Graphics:** @react-three/fiber@8.17.10, @react-three/drei@9.122.0
- **Routing:** wouter (/, /plantai)
- **Backend:** Express (serves frontend, no API routes needed)
- **Build:** Vite

## Project Structure
- `client/src/pages/home.tsx` - Main portfolio page with all sections (Hero, About, Robotics, Games, Projects, Contact, Footer)
- `client/src/pages/plantai.tsx` - Dedicated PlantAI Health project page with hero, overview, features, screenshots, version history, tech stack, and CTA
- `client/src/components/theme-toggle.tsx` - Dark/light mode toggle component
- `client/src/components/games/snake-game.tsx` - Playable Snake game with 3 modes (Classic, Speed, Infinite)
- `client/src/components/games/solar-system.tsx` - Interactive 3D solar system explorer (React Three Fiber) with WebGL fallback
- `client/src/App.tsx` - App entry point with router
- `client/public/images/` - AI-generated images for PlantAI page (hero, dashboard, mobile, team)

## Pages
### Home (/)
1. **Hero** - Name, subtitle, tagline, CTA buttons
2. **About** - Bio text and skills badges
3. **Robotics** - 3 cards: FLL State, FTC Team 31628, PlantAI Health (links to /plantai)
4. **Games** - Playable Solar System Explorer & Snake Game with GitHub links
5. **Projects** - All projects listed with tags and links (PlantAI links to /plantai)
6. **Contact** - Email, GitHub, Replit deployment URL
7. **Footer** - Copyright and quick links

### PlantAI Health (/plantai)
1. **Hero** - Full-width hero with background image, badges, CTA
2. **Overview** - About the project with stats and dashboard screenshot
3. **Features** - 6 feature cards (AI ID, Disease Detection, Care Schedules, etc.)
4. **Screenshots** - Mobile interface and team collaboration images
5. **Version History** - Timeline of v1.0 → v2.0 → v3.0 evolution
6. **Tech Stack** - Categorized technology badges
7. **CTA** - Visit live site and back to portfolio buttons
8. **Footer** - Copyright and quick links

## Key Details
- Email: aiden_wang@s.thevillageschool.com
- GitHub: https://github.com/Paoloop6
- Theme: Blues/greens, professional scholarship-ready design
- Font: Inter (sans), Lora (serif), JetBrains Mono (mono)
- Games are fully playable inline (no external dependencies for game logic)
- PlantAI Health live site: https://plantai-health.com
- @react-three/fiber pinned to 8.17.10 and @react-three/drei to 9.122.0 (avoid install failures)
