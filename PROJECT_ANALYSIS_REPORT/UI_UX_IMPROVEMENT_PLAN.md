# UI/UX Improvement Plan

## 1. Visual Aesthetics (The "WOW" Factor)
- **Color Palette:** Enhance the current cyber-black theme by introducing deep purple and cyan meshes for backgrounds, completely removing harsh borders. Use a glassmorphism style that relies on background blur and subtle lighting rather than thick borders.
- **Typography:** Increase the scale of the Hero title. Use a mix of `Inter` for body and a highly stylized font (like `Outfit` or `Space Grotesk`) for headings to give it a modern tech vibe.

## 2. Interactive Elements
- **Magnetic Buttons:** Apply GSAP to make primary buttons "magnetic" (they pull slightly towards the cursor when hovering).
- **Dynamic Cursor:** Refactor `CustomCursor.tsx` to use GSAP for smoother interpolation. Allow it to scale up and show text (like "VIEW", "DRAG") depending on the hovered element.
- **Scroll Progress Indicator:** Add a sleek vertical or horizontal scroll progress bar attached to the navbar.

## 3. Layout Restructuring
- **Fullscreen Sections:** Force the Hero and About sections to take exactly `100vh`, ensuring the user is fully immersed before scrolling to the next block.
- **Z-Index Management:** The 3D canvas should be a background layer spanning the entire screen (`fixed inset-0`), with HTML content scrolling *over* it. Currently, your canvas is forced into a `45%` width box, breaking the immersive feel.

## 4. Animations
- **Text Reveal:** Instead of fading in blocks of text, use GSAP `SplitText` (or custom word splitting) to reveal headers word-by-word or character-by-character from the bottom up.
- **Parallax:** Add slight parallax effects to images and cards so they scroll at a different speed than the background.

## 5. Micro-Interactions
- Add a subtle notification or sound effect (optional) when the user successfully copies the email address from the contact section.
- Cards in the Experience/Projects section should have a 3D tilt effect driven by mouse coordinates.
