import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Character3D from './components/Character3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WorkExperience from './components/WorkExperience';
import Skills from './components/Skills';
import GitHubProjects from './components/GitHubProjects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import LinkedInStats from './components/LinkedInStats';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-cyber-black text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* 3D Character - Fixed on right side */}
      <Character3D />

      {/* Content Layer */}
      <div className="relative z-10 lg:w-[55%]">
        <Navbar />
        <main>
          <Hero />
          <About />
          <WorkExperience />
          <Skills />
          <GitHubProjects />
          <Certifications />
          <Achievements />
          <LinkedInStats />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-neon-blue/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

export default App;
