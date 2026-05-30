export type Project = {
  name: string;
  slug: string;
  client: string;
  clientLogo: string;
  servicesRendered: string;
  featured: boolean;
  mainImage: string;
  largeDesktopImg: string;
  standardDesktopImg: string;
  tabletImg: string;
  mobileImg: string;
  additionalPhotos: string[];
  projectOverview: string;
  projectContribution: string;
  clientFeedback: string;
  finalThought: string;
  services: string[];
  liveLink: string;
  platformLogo: string;
};

export type Post = {
  name: string;
  slug: string;
  postBody: string;
  postSummary: string;
  mainImage: string;
  thumbnailImage: string;
  featured: boolean;
};

export type Video = {
  title: string;
  slug: string;
  featuredImage: string;
  youtubeUrl: string;
  featuredVideo: boolean;
  mainFeature: boolean;
  publishedOn: string;
};

export type DevProject = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  heroImage?: string;
  accentColor?: string;
  year?: string;
  problem?: string;
  solution?: string;
  features?: string[];
};

export type Service = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  projects: string[];
};
