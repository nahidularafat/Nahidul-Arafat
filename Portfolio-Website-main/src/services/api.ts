// API calls are now static

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Profile {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  tagline: string;
  role_line1: string;
  role_line2: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  codeforces_url: string;
  codechef_url: string;
  profile_image: string | null;
  resume_url: string;
  copyright_year: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  label: string;
  url: string;
  icon_name: string;
  order: number;
  is_active: boolean;
}

export interface ExpertiseItem {
  id: number;
  title: string;
  skills: string;
  order: number;
}

export interface ProjectBullet {
  id: number;
  text: string;
  order: number;
}

export interface Project {
  id: number;
  number: string;
  title: string;
  category: string;
  tools: string;
  image_url: string;
  link: string;
  order: number;
  bullets: ProjectBullet[];
}

export interface Achievement {
  id: number;
  highlight: string;
  description: string;
  order: number;
}

export interface CareerEntry {
  id: number;
  entry_type: "job" | "education" | "achievements";
  title: string;
  organization: string;
  org_url: string;
  period: string;
  description: string;
  order: number;
  achievements: Achievement[];
}

export interface AboutSkill {
  id: number;
  title: string;
  description: string;
  order: number;
}

export interface ExpertiseArea {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string;
  tags_list: string[];
  order: number;
}

export interface Tech {
  id: number;
  name: string;
  icon_url: string;
  color: string;
  order: number;
}

export interface TechCategory {
  id: number;
  title: string;
  order: number;
  techs: Tech[];
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  order: number;
}

import staticData from "../data/staticData.json";

// ─── API calls ────────────────────────────────────────────────────────────────
// The data is now bundled directly into the frontend to guarantee instant load times
// on Vercel's Edge network and completely bypass Render's free-tier cold starts.

export const getProfile = () => Promise.resolve(staticData.profile as Profile);
export const getSocialLinks = () => Promise.resolve(staticData.socialLinks as SocialLink[]);
export const getProjects = () => Promise.resolve(staticData.projects as Project[]);
export const getCareer = () => Promise.resolve(staticData.career as CareerEntry[]);
export const getAboutSkills = () => Promise.resolve(staticData.aboutSkills as AboutSkill[]);
export const getExpertiseAreas = () => Promise.resolve(staticData.expertiseAreas as ExpertiseArea[]);
export const getExpertiseItems = () => Promise.resolve(staticData.expertiseAreas as any[]); // Kept for backwards compatibility if needed
export const getTechCategories = () => Promise.resolve(staticData.techCategories as TechCategory[]);
export const getStats = () => Promise.resolve(staticData.stats as Stat[]);

// Dummy API export for backward compatibility where axios might be explicitly expected
const api = {
  get: () => Promise.resolve({ data: {} })
};
export default api;
