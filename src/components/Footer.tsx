import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaHeart, FaArrowUp } from 'react-icons/fa';
import { PROFILE } from '../data/profileData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bannerRef.current,
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 90%',
          },
        }
      );
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-cyber-border/50 bg-cyber-black/80 backdrop-blur-xl">
      <div className="section-container py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div ref={bannerRef} className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-7xl font-bold tracking-tight leading-none">
              <span className="neon-text">Let's Work</span>{' '}
              <span className="text-white">Together</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto">
              Have a project or opportunity? Let's build something great.
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 mt-6 px-8 py-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-medium hover:bg-neon-cyan/20 transition-all hoverable"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="text-2xl font-bold hoverable">
                <span className="neon-text">VP</span>
                <span className="text-white/80">.</span>
              </a>
              <p className="text-gray-500 text-sm mt-2 max-w-xs">
                Senior IT Executive building secure, reliable, and high-performance IT environments.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#about" className="text-gray-400 hover:text-neon-cyan transition-colors hoverable" aria-label="About section">About</a>
              <a href="#experience" className="text-gray-400 hover:text-neon-cyan transition-colors hoverable" aria-label="Experience section">Experience</a>
              <a href="#skills" className="text-gray-400 hover:text-neon-cyan transition-colors hoverable" aria-label="Skills section">Skills</a>
              <a href="#projects" className="text-gray-400 hover:text-neon-cyan transition-colors hoverable" aria-label="Projects section">Projects</a>
              <a href="#contact" className="text-gray-400 hover:text-neon-cyan transition-colors hoverable" aria-label="Contact section">Contact</a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-cyber-gray flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all hoverable"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href={PROFILE.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2]/30 transition-all hoverable"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/20 hover:scale-110 transition-all hoverable"
                aria-label="Back to top"
              >
                <FaArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-cyber-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <p className="flex items-center gap-1">
              Made with <FaHeart className="w-3 h-3 text-red-500" /> by Vaibhav Patel
            </p>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}