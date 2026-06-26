export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  fork: boolean;
  homepage: string | null;
}

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  blog: string | null;
  location: string | null;
  company: string | null;
  hireable: boolean | null;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  responsibilities?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer?: string;
  year?: string;
  icon?: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}

export interface LinkedInStat {
  label: string;
  value: string;
  icon: string;
}
