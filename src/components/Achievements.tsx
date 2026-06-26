import { useEffect, useRef } from 'react';
import { FaServer, FaUsers, FaGlobe, FaShieldAlt, FaLock, FaAward } from 'react-icons/fa';
import { ACHIEVEMENTS } from '../data/profileData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  FaServer: <FaServer className="w-6 h-6" />,
  FaUsers: <FaUsers className="w-6 h-6" />,
  FaGlobe: <FaGlobe className="w-6 h-6" />,
  FaShieldAlt: <FaShieldAlt className="w-6 h-6" />,
  FaLock: <FaLock className="w-6 h-6" />,
  FaAward: <FaAward className="w-6 h-6" />,
};


export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.achievement-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.95 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-container">
      <div className="max-w-6xl">
        <div className="mb-4">
          <span className="text-neon-cyan text-sm font-mono font-medium tracking-wider uppercase">Highlights</span>
        </div>
        <h2 className="section-title text-white mb-4">
          Key <span className="neon-text">Achievements</span>
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Milestones and accomplishments that define my career in IT infrastructure and enterprise technology management.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement, index) => (
            <div
              key={index}
              className="achievement-card glass-card-hover p-6 group hoverable relative"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-neon-cyan/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/10 flex items-center justify-center mb-5 text-neon-cyan group-hover:scale-110 transition-transform">
                {iconMap[achievement.icon]}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {achievement.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
