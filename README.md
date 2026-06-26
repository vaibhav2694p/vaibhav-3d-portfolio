# Vaibhav Patel — 3D Portfolio Website

A slick, modern, one-page 3D portfolio website featuring a dark futuristic theme, a prominent 3D animated character, glassmorphism UI, neon accents, smooth scroll animations, and interactive micro-interactions.

![Portfolio Preview](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Portfolio Preview](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)
![Portfolio Preview](https://img.shields.io/badge/Three.js-0.168.0-black?logo=three.js)
![Portfolio Preview](https://img.shields.io/badge/Tailwind-3.4.17-cyan?logo=tailwindcss)

---

## Features

- **3D Animated Character** — A procedural "Cyber IT Warrior" built with React Three Fiber, featuring mouse-follow rotation, idle animations, floating orbs, particles, and rotating rings.
- **Dark Futuristic Theme** — Deep cyber-black palette with neon cyan/blue/purple accents.
- **Glassmorphism Cards** — Frosted glass UI with subtle borders and glow effects.
- **Custom Cursor** — Animated dot + ring cursor that reacts to interactive elements.
- **Smooth Scroll Animations** — GSAP ScrollTrigger animations for all sections.
- **Live GitHub Integration** — Fetches repositories dynamically from the GitHub API.
- **Responsive Design** — Desktop-first with a 3D character on the side; mobile-optimized layout.
- **All Personal Data** — Work experience, skills, certifications, achievements, LinkedIn stats, and contact info.

## Sections

1. Hero — Animated typing title, CTA buttons, quick info
2. About Me — Bio, personal details, info cards
3. Work Experience — Animated timeline with 6 positions
4. Skills — Categorized skill badges with animated reveals
5. GitHub Projects — Live-fetched repos with stars, forks, languages
6. Certifications — 10 certifications in a grid gallery
7. Achievements — 6 key accomplishment cards
8. LinkedIn Stats — Professional metrics highlight grid
9. Contact — Contact form + info + social links

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Three.js + React Three Fiber | 3D rendering |
| @react-three/drei | 3D helpers |
| GSAP + ScrollTrigger | Animations |
| react-icons | Icon library |

## Installation

```bash
# Clone or navigate to the project folder
cd 3d-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server will start at `http://localhost:5173`.

## Build for Production

```bash
npm run build
```

The optimized build will be output to the `dist/` folder.

## Deployment

### Vercel

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run:
   ```bash
   vercel
   ```
3. Follow the prompts. Vercel will detect Vite automatically.

### Netlify

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder:
   ```bash
   npx netlify deploy --dir=dist --prod
   ```
   Or drag the `dist/` folder into the Netlify dashboard.

### GitHub Pages

1. Update `vite.config.ts` to set the base path:
   ```ts
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   });
   ```
2. Build and deploy using `gh-pages`:
   ```bash
   npm install -D gh-pages
   npm run build
   npx gh-pages -d dist
   ```

## Project Structure

```
3d-portfolio/
├── public/
│   ├── Vaibhav_Patel_CV.pdf
│   ├── Certificate_merged.pdf
│   └── images/
├── src/
│   ├── components/
│   │   ├── Character3D.tsx      # 3D cyber warrior (R3F)
│   │   ├── CustomCursor.tsx      # Custom cursor
│   │   ├── Navbar.tsx            # Fixed navigation
│   │   ├── Hero.tsx              # Hero section
│   │   ├── About.tsx             # About section
│   │   ├── WorkExperience.tsx    # Timeline
│   │   ├── Skills.tsx            # Skill badges
│   │   ├── GitHubProjects.tsx    # Live GitHub repos
│   │   ├── Certifications.tsx    # Certificate grid
│   │   ├── Achievements.tsx      # Achievement cards
│   │   ├── LinkedInStats.tsx     # Stats grid
│   │   ├── Contact.tsx           # Contact form
│   │   └── Footer.tsx            # Footer
│   ├── hooks/
│   │   ├── useMousePosition.ts   # Mouse tracking
│   │   └── useScrollAnimation.ts # GSAP scroll hooks
│   ├── data/
│   │   └── profileData.ts        # All personal data
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   ├── App.tsx                   # Main app
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles + Tailwind
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── index.html
```

## Customization

- **Personal data**: Edit `src/data/profileData.ts`
- **Colors**: Update `tailwind.config.js` under `theme.extend.colors`
- **3D Character**: Modify `src/components/Character3D.tsx`
- **Animations**: Adjust GSAP settings in each component

## License

MIT — feel free to use and adapt for your own portfolio.

---

Built with by **Vaibhav Patel**
