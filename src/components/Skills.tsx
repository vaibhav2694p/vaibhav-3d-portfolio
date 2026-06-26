import { useEffect, useRef } from 'react';
import { SKILL_CATEGORIES } from '../data/profileData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.skill-category');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      const badges = sectionRef.current!.querySelectorAll('.skill-badge-anim');
      badges.forEach((badge, i) => {
        gsap.fromTo(
          badge,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: i * 0.03,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: badge,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-container">
      <div className="max-w-6xl">
        <div className="mb-4">
          <span className="text-neon-cyan text-sm font-mono font-medium tracking-wider uppercase">Expertise</span>
        </div>
        <h2 className="section-title text-white mb-4">
          Technical <span className="neon-text">Skills</span>
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl">
          A comprehensive toolkit built over 10+ years of hands-on experience across IT infrastructure, cloud operations, cybersecurity, and emerging AI technologies.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, index) => (
            <div key={index} className="skill-category glass-card-hover p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <span key={i} className="skill-badge-anim skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
