import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';
import { GitHubRepo, GitHubUser } from '../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3776ab',
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  'C#': '#178600',
  Go: '#00add8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Shell: '#89e051',
  null: '#8b949e',
};

export default function GitHubProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/vaibhav2694p'),
          fetch('https://api.github.com/users/vaibhav2694p/repos?per_page=100&sort=updated'),
        ]);
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        setUser(userData);
        setRepos(reposData.filter((r: GitHubRepo) => !r.fork));
      } catch (err) {
        setError('Failed to load GitHub projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || loading) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.project-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
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
  }, [loading]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="projects" ref={sectionRef} className="section-container">
      <div className="max-w-6xl">
        <div className="mb-4">
          <span className="text-neon-cyan text-sm font-mono font-medium tracking-wider uppercase">Portfolio</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title text-white">
              GitHub <span className="neon-text">Projects</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-xl">
              Explore my open-source projects, automation tools, and experimental builds. All projects are fetched live from GitHub.
            </p>
          </div>
          {user && (
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyber-gray border border-cyber-border text-white font-medium hover:border-neon-cyan/50 hover:text-neon-cyan transition-all hoverable self-start"
            >
              <FaGithub className="w-5 h-5" />
              View All on GitHub
            </a>
          )}
        </div>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-5 bg-cyber-gray rounded w-3/4 mb-4" />
                <div className="h-4 bg-cyber-gray rounded w-full mb-2" />
                <div className="h-4 bg-cyber-gray rounded w-2/3 mb-4" />
                <div className="flex gap-4 mt-4">
                  <div className="h-4 bg-cyber-gray rounded w-16" />
                  <div className="h-4 bg-cyber-gray rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="glass-card p-8 text-center">
            <p className="text-gray-400 mb-4">{error}</p>
            <a
              href="https://github.com/vaibhav2694p"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-medium hoverable"
            >
              <FaGithub className="w-5 h-5" />
              Visit GitHub Profile
            </a>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="glass-card p-8 text-center">
            <p className="text-gray-400">No repositories found.</p>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card glass-card-hover p-6 group hoverable flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FaGithub className="w-5 h-5 text-gray-500 group-hover:text-neon-cyan transition-colors" />
                    <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors truncate">
                      {repo.name}
                    </h3>
                  </div>
                  <FaExternalLinkAlt className="w-4 h-4 text-gray-600 group-hover:text-neon-cyan transition-colors flex-shrink-0 ml-2" />
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                  {repo.description || 'No description provided.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-sm mt-auto">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#8b949e' }}
                      />
                      <span className="text-gray-400">{repo.language}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-gray-500">
                    <FaStar className="w-3.5 h-3.5" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <FaCodeBranch className="w-3.5 h-3.5" />
                    {repo.forks_count}
                  </span>
                  <span className="text-gray-600 ml-auto text-xs">
                    {formatDate(repo.updated_at)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
