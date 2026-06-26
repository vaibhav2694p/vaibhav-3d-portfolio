import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaDownload, FaMapMarkerAlt, FaEnvelope, FaBriefcase } from 'react-icons/fa';
import { PROFILE } from '../data/profileData';
import gsap from 'gsap';

function MagneticButton({ children, href, download, className }: { children: React.ReactNode; href: string; download?: boolean; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power3.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <a ref={ref} href={href} download={download} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className={className}>
      {children}
    </a>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.3 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        .to(
          nameRef.current,
          { duration: 0.01, opacity: 1 },
          '-=0.4'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 }
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;
    const tl = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });
    return () => { tl.kill(); };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={sectionRef} className="section-container min-h-screen flex flex-col justify-center relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto lg:mx-0">
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-gray-300 font-medium">Available for Opportunities</span>
        </div>

        <h1 ref={titleRef} className="hero-title mb-6">
          <span className="text-white">Hi, I&apos;m </span>
          <span ref={nameRef} className="neon-text">{PROFILE.name}</span>
          <span ref={cursorRef} className="text-neon-cyan font-light ml-0.5">|</span>
        </h1>

        <p ref={subtitleRef} className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl">
          {PROFILE.tagline}
          <span className="block mt-2 text-neon-cyan font-medium text-sm sm:text-base">{PROFILE.role}</span>
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12">
          <MagneticButton
            href={PROFILE.linkedIn}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-neon-blue/30 to-neon-cyan/20 border border-neon-blue/50 text-white font-medium hover:from-neon-blue/40 hover:to-neon-cyan/30 hover:shadow-[0_0_25px_rgba(0,102,255,0.3)] transition-all hoverable text-sm sm:text-base"
          >
            <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            View LinkedIn
          </MagneticButton>
          <MagneticButton
            href={PROFILE.github}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-cyber-gray border border-cyber-border text-white font-medium hover:border-neon-cyan/50 hover:text-neon-cyan hover:bg-cyber-gray/80 transition-all hoverable text-sm sm:text-base"
          >
            <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
            GitHub Profile
          </MagneticButton>
          <MagneticButton
            href={PROFILE.resume}
            download
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-cyber-gray border border-cyber-border text-white font-medium hover:border-neon-cyan/50 hover:text-neon-cyan hover:bg-cyber-gray/80 transition-all hoverable text-sm sm:text-base"
          >
            <FaDownload className="w-4 h-4 sm:w-5 sm:h-5" />
            Download Resume
          </MagneticButton>
        </div>

        <div ref={statsRef} className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-cyan" />
            <span>{PROFILE.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-cyan" />
            <span>{PROFILE.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBriefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-cyan" />
            <span>10+ Years Experience</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo('#about')}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-neon-cyan transition-colors hoverable"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] sm:text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-current flex justify-center pt-2">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-current animate-bounce" />
        </div>
      </button>
    </section>
  );
}