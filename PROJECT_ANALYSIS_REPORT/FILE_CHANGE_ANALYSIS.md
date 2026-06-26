# File Change Analysis

To achieve the desired results, the following files will be modified, created, or deleted.

## 1. Root Configuration Files
- **`vite.config.ts`** 
  - *Change:* Update `base` path for GitHub Pages deployment.
- **`index.html`**
  - *Change:* Add comprehensive SEO meta tags, OpenGraph tags, and update the favicon link.
- **`package.json`**
  - *Change:* May need to add `framer-motion` (optional, if we prefer it over GSAP for UI) or additional three.js utilities. Ensure `@react-three/drei` is heavily utilized.

## 2. Global Styles & Types
- **`src/index.css`**
  - *Change:* Overhaul custom cursor CSS, fix mobile canvas layout overlapping, add utility classes for magnetic effects.

## 3. Component Updates (Modifications)
- **`src/App.tsx`**
  - *Change:* Introduce a `<Suspense>` boundary and a `<LoadingScreen />`. Refactor the layout so the `<Canvas>` is a fixed fullscreen background.
- **`src/components/Hero.tsx`**
  - *Change:* Replace CSS animations with GSAP `timeline`. Add magnetic hover effects to buttons.
- **`src/components/Character3D.tsx`**
  - *Change:* Major overhaul. Remove geometric primitives. Implement `useGLTF` to load a professional 3D avatar/model. Add scroll-based camera movements.
- **`src/components/Navbar.tsx`**
  - *Change:* Enhance mobile menu with fullscreen GSAP animation.
- **`src/components/CustomCursor.tsx`**
  - *Change:* Rewrite logic to use GSAP for smooth trailing, add states (hover, click, drag) and touch-device detection.

## 4. New Components (To Create)
- **`src/components/LoadingScreen.tsx`**
  - *Purpose:* A highly stylized preloader that displays loading percentage while the 3D assets download.
- **`src/components/Timeline.tsx`**
  - *Purpose:* A new component to replace the static Experience list with an animated glowing vertical timeline.
- **`src/components/ContactForm.tsx`**
  - *Purpose:* Add a functional, beautifully styled input form to the Contact section.
