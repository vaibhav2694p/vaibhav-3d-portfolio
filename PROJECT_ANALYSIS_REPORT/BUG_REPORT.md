# Bug Report

This document outlines all the bugs and issues identified during the audit of the website.

## 1. UI/Layout Bugs
- **Mobile Canvas Overlap**
  - *Current Problem:* In `index.css`, `.canvas-container` is given `width: 100%`, `height: 50vh`, and `opacity: 0.4` on mobile screens. It overlaps with text and creates visual clutter.
  - *Why:* Makes content hard to read on mobile devices.
  - *File:* `src/index.css`
  - *Fix:* Adjust mobile layout for the canvas (e.g., place it behind content with a lower opacity, or in a specific hero block).
  - *Risk:* Medium
  - *Deployment Impact:* Yes, affects mobile UX on live site.

- **Custom Cursor on Touch Devices**
  - *Current Problem:* `* { cursor: none !important; }` is applied globally. The custom cursor script doesn't handle touch devices natively, meaning users on mobile might experience weird interactions.
  - *Why:* Mobile users don't have cursors; disabling default touch interactions or hiding the default cursor behavior globally can cause issues.
  - *File:* `src/index.css` and `src/components/CustomCursor.tsx`
  - *Fix:* Use a media query (`@media (pointer: fine)`) for the custom cursor CSS, and disable the custom cursor rendering on touch devices.
  - *Risk:* Medium
  - *Deployment Impact:* Yes.

## 2. Console Errors & Warnings
- **Missing Keys in Iterators**
  - *Current Problem:* (Potential) Some components mapping over `PROFILE` data arrays might be missing unique `key` props.
  - *Why:* Causes React console warnings and hurts rendering performance.
  - *File:* Various components (e.g., `Skills.tsx`, `GitHubProjects.tsx`)
  - *Fix:* Ensure all `.map()` iterators use a unique `key`.
  - *Risk:* Low
  - *Deployment Impact:* No, but affects performance.

## 3. Deployment & Path Issues
- **GitHub Pages Routing / Assets**
  - *Current Problem:* Vite's default build uses absolute paths (`/assets/...`). If hosted on GitHub Pages at `https://vaibhav2694p.github.io/vaibhav-3d-portfolio/`, the base path needs to be correctly set.
  - *Why:* Assets will 404 if the `base` in `vite.config.ts` is not set to `/vaibhav-3d-portfolio/`.
  - *File:* `vite.config.ts`
  - *Fix:* Add `base: '/vaibhav-3d-portfolio/'` in `vite.config.ts`.
  - *Risk:* High
  - *Deployment Impact:* Yes, critical for GitHub pages deployment.

## 4. Animation Issues
- **Hero Typing Animation**
  - *Current Problem:* Uses `setInterval` in a `useEffect` without proper cleanup for the typing cursor.
  - *Why:* Can cause memory leaks or duplicate typing intervals if the component re-renders.
  - *File:* `src/components/Hero.tsx`
  - *Fix:* Implement a more robust typing effect using GSAP `TextPlugin` or a dedicated library like `framer-motion` to match the reference site.
  - *Risk:* Low
  - *Deployment Impact:* Minimal.
