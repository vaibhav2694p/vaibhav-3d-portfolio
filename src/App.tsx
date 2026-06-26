import { useState, useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WorkExperience from './components/WorkExperience';
import Skills from './components/Skills';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

const GitHubProjects = lazy(() => import('./components/GitHubProjects'));
const Certifications = lazy(() => import('./components/Certifications'));
const Achievements = lazy(() => import('./components/Achievements'));
const LinkedInStats = lazy(() => import('./components/LinkedInStats'));
const Contact = lazy(() => import('./components/Contact'));

const Character3D = lazy(() => import('./components/Character3D'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

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
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      <div className={`relative min-h-screen bg-cyber-black text-white overflow-x-hidden transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <CustomCursor />

        <Suspense fallback={null}>
          <Character3D />
        </Suspense>

        <div className="relative z-10 lg:w-[55%]">
          <Navbar />
          <main>
            <Hero />
            <About />
            <WorkExperience />
            <Skills />
            <Suspense fallback={<div className="section-container"><div className="h-40 animate-pulse bg-cyber-gray rounded-2xl" /></div>}>
              <GitHubProjects />
            </Suspense>
            <Suspense fallback={null}>
              <Certifications />
            </Suspense>
            <Suspense fallback={null}>
              <Achievements />
            </Suspense>
            <Suspense fallback={null}>
              <LinkedInStats />
            </Suspense>
            <Suspense fallback={null}>
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </div>

        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-neon-blue/5 rounded-full blur-3xl" />
        </div>
      </div>
    </>
  );
}

export default App;