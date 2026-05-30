import fs from "node:fs";
import path from "node:path";

export type ResumeContact = {
  email: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
};

export type ResumeExperience = {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export type ResumeEducation = {
  institution: string;
  degree: string;
  start: string;
  end: string;
};

export type Resume = {
  headline: string;
  contact: ResumeContact;
  summary: string;
  skills: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  featuredProjectSlugs: string[];
  pdfFilename: string;
};

const RESUME_PATH = path.join(process.cwd(), "content", "resume.json");

export function getResume(): Resume {
  const content = fs.readFileSync(RESUME_PATH, "utf8");
  return JSON.parse(content) as Resume;
}

export function getResumePdfPath(resume: Resume): string {
  return `/resume/${resume.pdfFilename}`;
}
