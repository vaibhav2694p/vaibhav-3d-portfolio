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
    <footer className="w-full border-t border-cyber-border/50 bg-cyber-black/80 backdrop-blur-xl overflow-hidden">
      <div className="section-container py-8 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div ref={bannerRef} className="text-center mb-12 lg:mb-20">
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none">
              <span className="neon-text">Let&apos;s Work</span>{' '}
              <span className="text-white">Together</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm sm:text-base">
              Have a project or opportunity? Let&apos;s build something great.
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 mt-6 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-neon-cyan/15 to-neon-blue/15 border border-neon-cyan/40 text-neon-cyan font-medium hover:from-neon-cyan/25 hover:to-neon-blue/25 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] transition-all hoverable text-sm sm:text-base"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="text-xl sm:text-2xl font-bold hoverable">
                <span className="neon-text">VP</span>
                <span className="text-white/80">.</span>
              </a>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-xs mx-auto lg:mx-0">
                Senior IT Executive building secure, reliable, and high-performance IT environments.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm order-3 lg:order-2">
              <a href="#about" className="text-gray-400 hover:text-neon-cyan transition-colors hoverable">About</a>
              <a href="#experience" className="text-gray-400 hover:text-neon-cyan transition-colors hoverable">Experience</a>
              <a href="#skills" className="text-gray-400 hover:text-neon-cyan transition-colors hoverable">Skills</a>
              <a href="#projects" className="text-gray-400 hover:text-neon-cyan transition-colors hoverable">Projects</a>
              <a href="#contact" className="text-gray-400 hover:text-neon-cyan transition-colors hoverable">Contact</a>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 order-1 lg:order-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyber-gray flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all hoverable"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href={PROFILE.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2]/30 transition-all hoverable"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <button
                onClick={scrollToTop}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/20 hover:scale-110 transition-all hoverable"
                aria-label="Back to top"
              >
                <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-cyber-border/30 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
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