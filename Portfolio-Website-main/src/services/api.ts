import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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

// ─── API calls ────────────────────────────────────────────────────────────────

export const getProfile = () => api.get<Profile>("/profile/").then((r) => r.data);
export const getSocialLinks = () => api.get<SocialLink[]>("/social-links/").then((r) => r.data);
export const getProjects = () => api.get<Project[]>("/projects/").then((r) => r.data);
export const getCareer = () => api.get<CareerEntry[]>("/career/").then((r) => r.data);
export const getAboutSkills = () => api.get<AboutSkill[]>("/about-skills/").then((r) => r.data);
export const getExpertiseAreas = () => api.get<ExpertiseArea[]>("/expertise-areas/").then((r) => r.data);
export const getExpertiseItems = () => api.get<ExpertiseItem[]>("/expertise-items/").then((r) => r.data);
export const getTechCategories = () => api.get<TechCategory[]>("/tech-categories/").then((r) => r.data);
export const getStats = () => api.get<Stat[]>("/stats/").then((r) => r.data);

export default api;
