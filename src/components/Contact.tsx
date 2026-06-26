import { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaLinkedin, FaGithub, FaBlog, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { PROFILE } from '../data/profileData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const elements = sectionRef.current!.querySelectorAll('.scroll-reveal');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" ref={sectionRef} className="section-container">
      <div className="max-w-6xl">
        <div className="scroll-reveal mb-4">
          <span className="text-neon-cyan text-sm font-mono font-medium tracking-wider uppercase">Get in Touch</span>
        </div>
        <h2 className="scroll-reveal section-title text-white mb-4">
          Let's <span className="neon-text">Connect</span>
        </h2>
        <p className="scroll-reveal text-gray-400 mb-12 max-w-2xl">
          Open to opportunities in System Administration, Microsoft 365 Administration, Azure Administration, IT Infrastructure Engineering, and IT Executive / IT Management roles.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="scroll-reveal space-y-6">
            <div className="glass-card-hover p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-neon-cyan/10 flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="w-6 h-6 text-neon-cyan" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <a href={`mailto:${PROFILE.email}`} className="text-white font-medium hover:text-neon-cyan transition-colors">
                  {PROFILE.email}
                </a>
              </div>
            </div>

            <div className="glass-card-hover p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-neon-blue/10 flex items-center justify-center flex-shrink-0">
                <FaPhone className="w-6 h-6 text-neon-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} className="text-white font-medium hover:text-neon-blue transition-colors">
                  {PROFILE.phone}
                </a>
              </div>
            </div>

            <div className="glass-card-hover p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-neon-purple/10 flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="w-6 h-6 text-neon-purple" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="text-white font-medium">{PROFILE.location}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-6">
              <p className="text-sm text-gray-500 mb-4">Follow Me</p>
              <div className="flex gap-3">
                <a
                  href={PROFILE.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2]/30 hover:scale-110 transition-all hoverable"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-cyber-gray flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 hover:scale-110 transition-all hoverable"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href={PROFILE.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 hover:bg-orange-500/30 hover:scale-110 transition-all hoverable"
                  aria-label="Blog"
                >
                  <FaBlog className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="scroll-reveal">
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-cyber-gray border border-cyber-border text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-cyber-gray border border-cyber-border text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-cyber-gray border border-cyber-border text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 transition-all resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/50 text-white font-medium hover:from-neon-cyan/30 hover:to-neon-blue/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all flex items-center justify-center gap-2 hoverable disabled:opacity-70"
              >
                {submitted ? (
                  <>
                    <FaCheckCircle className="w-5 h-5 text-green-400" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
