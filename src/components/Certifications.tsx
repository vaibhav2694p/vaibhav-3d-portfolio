import { useEffect, useRef } from 'react';
import { FaCertificate, FaAward, FaExternalLinkAlt } from 'react-icons/fa';
import { CERTIFICATIONS } from '../data/profileData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.cert-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, rotateY: -10 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.6,
            delay: i * 0.08,
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
    <section id="certifications" ref={sectionRef} className="section-container">
      <div className="max-w-6xl">
        <div className="mb-4">
          <span className="text-neon-cyan text-sm font-mono font-medium tracking-wider uppercase">Credentials</span>
        </div>
        <h2 className="section-title text-white mb-4">
          <span className="neon-text">Certifications</span> & Training
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Industry-recognized certifications validating expertise across IT infrastructure, networking, cybersecurity, and cloud technologies.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CERTIFICATIONS.map((cert, index) => (
            <div
              key={index}
              className="cert-card glass-card-hover p-5 group hoverable relative overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 flex items-center justify-center flex-shrink-0">
                    <FaCertificate className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{cert.issuer}</p>
                    {cert.year && (
                      <p className="text-xs text-gray-600">{cert.year}</p>
                    )}
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-white leading-snug mb-2">
                  {cert.name}
                </h3>

                <div className="flex items-center gap-1 text-xs text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaAward className="w-3 h-3" />
                  <span>Verified Credential</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate PDF link */}
        <div className="mt-12 text-center">
          <a
            href="/Certificate_merged.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-medium hover:bg-neon-cyan/20 transition-all hoverable"
          >
            <FaExternalLinkAlt className="w-4 h-4" />
            View All Certificates (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
