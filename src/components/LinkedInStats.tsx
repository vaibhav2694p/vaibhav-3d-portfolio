import { useEffect, useRef } from 'react';
import { FaBriefcase, FaBuilding, FaCertificate, FaGlobe, FaUsers, FaServer, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { LINKEDIN_STATS, PROFILE } from '../data/profileData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  FaBriefcase: <FaBriefcase className="w-6 h-6" />,
  FaBuilding: <FaBuilding className="w-6 h-6" />,
  FaCertificate: <FaCertificate className="w-6 h-6" />,
  FaGlobe: <FaGlobe className="w-6 h-6" />,
  FaUsers: <FaUsers className="w-6 h-6" />,
  FaServer: <FaServer className="w-6 h-6" />,
};

export default function LinkedInStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.stat-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'back.out(1.5)',
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
          <span className="text-neon-cyan text-sm font-mono font-medium tracking-wider uppercase">Profile</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title text-white">
              LinkedIn <span className="neon-text">Highlights</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-xl">
              Professional metrics and career highlights reflecting a decade of continuous growth and impact in IT.
            </p>
          </div>
          <a
            href={PROFILE.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2]/20 border border-[#0A66C2]/50 text-white font-medium hover:bg-[#0A66C2]/30 transition-all hoverable self-start"
          >
            <FaLinkedin className="w-5 h-5" />
            View LinkedIn Profile
            <FaExternalLinkAlt className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {LINKEDIN_STATS.map((stat, index) => (
            <div
              key={index}
              className="stat-card glass-card-hover p-6 text-center group hoverable"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/10 flex items-center justify-center mx-auto mb-4 text-neon-cyan group-hover:scale-110 transition-transform">
                {iconMap[stat.icon]}
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
