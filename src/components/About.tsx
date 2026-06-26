import { useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaCalendar, FaLanguage, FaUser, FaQuoteLeft } from 'react-icons/fa';
import { PROFILE } from '../data/profileData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const elements = contentRef.current!.querySelectorAll('.scroll-reveal');
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      });

      const cards = contentRef.current!.querySelectorAll('.info-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-container">
      <div ref={contentRef} className="max-w-5xl mx-auto">
        <div className="scroll-reveal mb-4">
          <span className="text-neon-cyan text-sm font-mono font-medium tracking-wider uppercase">About Me</span>
        </div>
        <h2 className="scroll-reveal section-title text-white mb-12">
          Crafting Secure & <span className="neon-text">High-Performance</span> IT Environments
        </h2>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3 scroll-reveal space-y-6">
            <div className="flex items-start gap-3">
              <FaQuoteLeft className="w-6 h-6 text-neon-cyan/40 mt-1 flex-shrink-0" />
              <p className="text-gray-400 leading-relaxed text-lg">
                {PROFILE.bio}
              </p>
            </div>
            <p className="text-gray-400 leading-relaxed pl-9">
              I currently lead IT operations at Safebooks Global, managing Microsoft 365, Azure Active Directory (Entra ID),
              Microsoft Intune, Azure Virtual Desktop (AVD), network security, endpoint management, disaster recovery, and
              enterprise infrastructure supporting 100+ users across multiple business functions.
            </p>
            <p className="text-gray-400 leading-relaxed pl-9">
              Recognized for maintaining 99.9% system availability, managing 15+ domains and cloud environments, optimizing
              IT operations through automation, and implementing proactive security and compliance initiatives. Adept at aligning
              technology strategies with business objectives while ensuring reliability, scalability, and operational excellence.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <div className="info-card glass-card-hover p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center flex-shrink-0">
                <FaUser className="w-4 h-4 text-neon-cyan" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="text-white font-medium text-sm">{PROFILE.name}</p>
              </div>
            </div>
            <div className="info-card glass-card-hover p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center flex-shrink-0">
                <FaCalendar className="w-4 h-4 text-neon-blue" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Date of Birth</p>
                <p className="text-white font-medium text-sm">{PROFILE.dob}</p>
              </div>
            </div>
            <div className="info-card glass-card-hover p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neon-purple/10 flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="w-4 h-4 text-neon-purple" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-white font-medium text-sm">{PROFILE.location}</p>
              </div>
            </div>
            <div className="info-card glass-card-hover p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neon-pink/10 flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="w-4 h-4 text-neon-pink" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-white font-medium text-sm">{PROFILE.email}</p>
              </div>
            </div>
            <div className="info-card glass-card-hover p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <FaLanguage className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Languages</p>
                <p className="text-white font-medium text-sm">{PROFILE.languages.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}