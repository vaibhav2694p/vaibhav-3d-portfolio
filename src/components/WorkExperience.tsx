import { useEffect, useRef } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaCalendar, FaCircle } from 'react-icons/fa';
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
          { opacity: 0, x: -40, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
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
            },
          }
        );
      });

      const line = sectionRef.current!.querySelector('.timeline-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power3.out',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-container">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="text-neon-cyan text-sm font-mono font-medium tracking-wider uppercase">Career</span>
        </div>
        <h2 className="section-title text-white mb-12">
          Work <span className="neon-text">Experience</span>
        </h2>

        <div className="relative">
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-blue to-neon-purple timeline-line origin-top" />

          <div className="space-y-10">
            {WORK_EXPERIENCE.map((job, index) => (
              <div key={index} className="relative pl-12">
                <div className="timeline-dot absolute left-[11px] w-4 h-4 rounded-full bg-neon-cyan border-4 border-cyber-black shadow-[0_0_12px_rgba(0,212,255,0.6)] z-10 mt-1.5" />

                <div className="timeline-card">
                  <div className="glass-card-hover p-5 sm:p-6 lg:p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/10 flex items-center justify-center flex-shrink-0">
                        <FaBriefcase className="w-5 h-5 text-neon-cyan" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-white">{job.company}</h3>
                        <p className="text-sm text-neon-cyan font-medium">{job.role}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FaCalendar className="w-3 h-3" />
                        {job.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaMapMarkerAlt className="w-3 h-3" />
                        {job.location}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-400 text-sm leading-relaxed flex items-start gap-2.5">
                          <FaCircle className="w-1.5 h-1.5 mt-[7px] flex-shrink-0 text-neon-cyan/60" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}