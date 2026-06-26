import { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaLinkedin, FaGithub, FaBlog, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import { PROFILE } from '../data/profileData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FORM_ENDPOINT = 'https://formspree.io/f/';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

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
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 4000);
  };

  return (
    <section id="contact" ref={sectionRef} className="section-container">
      <div className="max-w-6xl mx-auto">
        <div className="scroll-reveal mb-4">
          <span className="text-neon-cyan text-sm font-mono font-medium tracking-wider uppercase">Get in Touch</span>
        </div>
        <h2 className="scroll-reveal section-title text-white mb-4">
          Let&apos;s <span className="neon-text">Connect</span>
        </h2>
        <p className="scroll-reveal text-gray-400 mb-12 max-w-2xl">
          Open to opportunities in System Administration, Microsoft 365 Administration, Azure Administration, IT Infrastructure Engineering, and IT Executive / IT Management roles.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="scroll-reveal space-y-4 sm:space-y-5">
            <a href={`mailto:${PROFILE.email}`} className="glass-card-hover p-5 sm:p-6 flex items-center gap-4 group hoverable">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-neon-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6 text-neon-cyan" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-0.5">Email</p>
                <p className="text-white font-medium text-sm sm:text-base truncate">{PROFILE.email}</p>
              </div>
            </a>

            <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} className="glass-card-hover p-5 sm:p-6 flex items-center gap-4 group hoverable">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-neon-blue/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <FaPhone className="w-5 h-5 sm:w-6 sm:h-6 text-neon-blue" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-0.5">Phone</p>
                <p className="text-white font-medium text-sm sm:text-base">{PROFILE.phone}</p>
              </div>
            </a>

            <div className="glass-card-hover p-5 sm:p-6 flex items-center gap-4 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-neon-purple/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <FaMapMarkerAlt className="w-5 h-5 sm:w-6 sm:h-6 text-neon-purple" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-0.5">Location</p>
                <p className="text-white font-medium text-sm sm:text-base">{PROFILE.location}</p>
              </div>
            </div>

            <div className="glass-card p-5 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-500 mb-4">Follow Me</p>
              <div className="flex gap-3">
                <a
                  href={PROFILE.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2]/30 hover:scale-110 transition-all hoverable"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyber-gray flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 hover:scale-110 transition-all hoverable"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={PROFILE.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 hover:bg-orange-500/30 hover:scale-110 transition-all hoverable"
                  aria-label="Blog"
                >
                  <FaBlog className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="scroll-reveal">
            <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5 sm:space-y-6" noValidate>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Send a Message</h3>

              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm text-gray-400 mb-1.5">Name</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-cyber-gray border text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all text-sm ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-cyber-border focus:border-neon-cyan focus:ring-neon-cyan/50'}`}
                  placeholder="Your name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="flex items-center gap-1 text-red-400 text-xs mt-1">
                    <FaExclamationCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm text-gray-400 mb-1.5">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }); }}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-cyber-gray border text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-cyber-border focus:border-neon-cyan focus:ring-neon-cyan/50'}`}
                  placeholder="your@email.com"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="flex items-center gap-1 text-red-400 text-xs mt-1">
                    <FaExclamationCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm text-gray-400 mb-1.5">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => { setFormData({ ...formData, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: '' }); }}
                  rows={4}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-cyber-gray border text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all resize-none text-sm ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-cyber-border focus:border-neon-cyan focus:ring-neon-cyan/50'}`}
                  placeholder="Your message... (min 10 characters)"
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="flex items-center gap-1 text-red-400 text-xs mt-1">
                    <FaExclamationCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/50 text-white font-medium hover:from-neon-cyan/30 hover:to-neon-blue/30 hover:shadow-[0_0_25px_rgba(0,212,255,0.25)] transition-all flex items-center justify-center gap-2 hoverable disabled:opacity-60 text-sm sm:text-base"
              >
                {status === 'sending' ? (
                  <><FaSpinner className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> Sending...</>
                ) : status === 'sent' ? (
                  <><FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" /> Message Sent!</>
                ) : status === 'error' ? (
                  <><FaExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" /> Send Failed — Try Email Directly</>
                ) : (
                  <><FaPaperPlane className="w-4 h-4 sm:w-5 sm:h-5" /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}