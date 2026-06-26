import { useEffect, useRef } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
import { WORK_EXPERIENCE } from '../data/profileData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.timeline-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      const dots = sectionRef.current!.querySelectorAll('.timeline-dot');
      dots.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            delay: 0.2,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
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
    <section id="experience" ref={sectionRef} className="section-container">
      <div className="max-w-5xl">
        <div className="mb-4">
          <span className="text-neon-cyan text-sm font-mono font-medium tracking-wider uppercase">Career</span>
        </div>
        <h2 className="section-title text-white mb-12">
          Work <span className="neon-text">Experience</span>
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-blue to-neon-purple lg:-translate-x-1/2" />

          <div className="space-y-12">
            {WORK_EXPERIENCE.map((job, index) => (
              <div key={index} className={`relative flex flex-col lg:flex-row gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="timeline-dot absolute left-4 lg:left-1/2 w-4 h-4 rounded-full bg-neon-cyan border-4 border-cyber-black shadow-[0_0_10px_rgba(0,212,255,0.5)] lg:-translate-x-1/2 z-10 mt-2" />

                {/* Content */}
                <div className={`timeline-card ml-12 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                  <div className={`glass-card-hover p-6 lg:p-8 ${index % 2 === 0 ? 'lg:items-end' : ''} flex flex-col`}>
                    <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center flex-shrink-0">
                        <FaBriefcase className="w-5 h-5 text-neon-cyan" />
                      </div>
                      <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                        <h3 className="text-lg font-bold text-white">{job.company}</h3>
                        <p className="text-neon-cyan font-medium">{job.role}</p>
                      </div>
                    </div>

                    <div className={`flex flex-wrap gap-4 mb-4 text-sm text-gray-500 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      <span className="flex items-center gap-1">
                        <FaCalendar className="w-3.5 h-3.5" />
                        {job.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                    </div>

                    <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-400 text-sm leading-relaxed">
                          <span className="text-neon-cyan mr-2">{index % 2 === 0 ? '◀' : '▶'}</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden lg:block lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
