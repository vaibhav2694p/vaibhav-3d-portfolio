import { useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaCalendar, FaLanguage, FaUser } from 'react-icons/fa';
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
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-container">
      <div ref={contentRef} className="max-w-4xl">
        <div className="scroll-reveal mb-4">
          <span className="text-neon-cyan text-sm font-mono font-medium tracking-wider uppercase">About Me</span>
        </div>
        <h2 className="scroll-reveal section-title text-white mb-8">
          Crafting Secure & <span className="neon-text">High-Performance</span> IT Environments
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="scroll-reveal space-y-6">
            <p className="text-gray-400 leading-relaxed text-lg">
              {PROFILE.bio}
            </p>
            <p className="text-gray-400 leading-relaxed">
              I currently lead IT operations at Safebooks Global, managing Microsoft 365, Azure Active Directory (Entra ID),
              Microsoft Intune, Azure Virtual Desktop (AVD), network security, endpoint management, disaster recovery, and
              enterprise infrastructure supporting 100+ users across multiple business functions.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Recognized for maintaining 99.9% system availability, managing 15+ domains and cloud environments, optimizing
              IT operations through automation, and implementing proactive security and compliance initiatives. Adept at aligning
              technology strategies with business objectives while ensuring reliability, scalability, and operational excellence.
            </p>
          </div>

          <div className="scroll-reveal space-y-4">
            <div className="glass-card-hover p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center flex-shrink-0">
                <FaUser className="w-5 h-5 text-neon-cyan" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-white font-medium">{PROFILE.name}</p>
              </div>
            </div>
            <div className="glass-card-hover p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center flex-shrink-0">
                <FaCalendar className="w-5 h-5 text-neon-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-white font-medium">{PROFILE.dob}</p>
              </div>
            </div>
            <div className="glass-card-hover p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="w-5 h-5 text-neon-purple" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-white font-medium">{PROFILE.location}</p>
              </div>
            </div>
            <div className="glass-card-hover p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="w-5 h-5 text-neon-pink" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-white font-medium">{PROFILE.email}</p>
              </div>
            </div>
            <div className="glass-card-hover p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <FaLanguage className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Languages</p>
                <p className="text-white font-medium">{PROFILE.languages.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
