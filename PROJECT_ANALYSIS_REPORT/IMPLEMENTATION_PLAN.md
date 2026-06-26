# Implementation Plan

## Phase 1: Setup & Housekeeping
1. Update `vite.config.ts` for GitHub pages deployment compatibility.
2. Update `index.html` with full SEO tags and OpenGraph data.
3. Clean up `index.css` to fix mobile overlapping issues and touch-device cursor bugs.

## Phase 2: Core UX & Preloader
1. Build `LoadingScreen.tsx` with a stylized percentage loader.
2. Wrap `App.tsx` content in `React.Suspense` connected to the preloader.
3. Overhaul `CustomCursor.tsx` using GSAP for buttery smooth trailing and interactive states.

## Phase 3: The 3D Experience (The Big Shift)
1. **Model Acquisition:** Obtain a suitable professional 3D model (GLB format).
2. **Scene Restructuring:** Modify `App.tsx` so `Character3D.tsx` spans the entire screen in the background (`fixed inset-0`).
3. **Model Integration:** Rewrite `Character3D.tsx` to load the GLB model using `@react-three/drei`.
4. **Scroll Reactions:** Hook the 3D model's rotation and position to the GSAP ScrollTrigger so it transitions as the user scrolls down the page.

## Phase 4: UI Animation & Component Refactoring
1. **Hero:** Implement GSAP text reveal and magnetic buttons.
2. **Experience:** Build the animated vertical glowing timeline.
3. **Projects:** Implement 3D tilt-card hover effects for project showcases.
4. **Contact:** Add a functional interactive form UI.

## Phase 5: Final Polish
1. Run accessibility checks (color contrast, ARIA tags).
2. Performance profiling (ensure 60FPS on scrolling).
3. Final mobile responsiveness check.

---
**Note:** Awaiting user approval before proceeding with Phase 1.
