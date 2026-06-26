import { useEffect, useRef, useState } from 'react';
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Vaibhav Patel';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="section-container min-h-screen flex flex-col justify-center relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-gray-300 font-medium">Available for Opportunities</span>
        </div>

        <h1 ref={titleRef} className="hero-title mb-6 opacity-0">
          <span className="text-white">Hi, I'm </span>
          <span className="neon-text">{typedText}</span>
          <span className="animate-pulse text-neon-cyan">|</span>
        </h1>

        <p ref={subtitleRef} className="text-lg lg:text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl opacity-0">
          {PROFILE.tagline}
          <span className="block mt-2 text-neon-cyan font-medium">{PROFILE.role}</span>
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12 opacity-0">
          <MagneticButton
            href={PROFILE.linkedIn}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-blue/20 border border-neon-blue/50 text-white font-medium hover:bg-neon-blue/30 hover:shadow-[0_0_20px_rgba(0,102,255,0.3)] transition-all hoverable"
          >
            <FaLinkedin className="w-5 h-5" />
            View LinkedIn
          </MagneticButton>
          <MagneticButton
            href={PROFILE.github}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyber-gray border border-cyber-border text-white font-medium hover:border-neon-cyan/50 hover:text-neon-cyan transition-all hoverable"
          >
            <FaGithub className="w-5 h-5" />
            GitHub Profile
          </MagneticButton>
          <MagneticButton
            href={PROFILE.resume}
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyber-gray border border-cyber-border text-white font-medium hover:border-neon-cyan/50 hover:text-neon-cyan transition-all hoverable"
          >
            <FaDownload className="w-5 h-5" />
            Download Resume
          </MagneticButton>
        </div>

        <div ref={statsRef} className="flex flex-wrap gap-6 text-sm text-gray-400 opacity-0">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="w-4 h-4 text-neon-cyan" />
            <span>{PROFILE.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="w-4 h-4 text-neon-cyan" />
            <span>{PROFILE.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBriefcase className="w-4 h-4 text-neon-cyan" />
            <span>10+ Years Experience</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-neon-cyan transition-colors hoverable"
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
        </div>
      </button>
    </section>
  );
}