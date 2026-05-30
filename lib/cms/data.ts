import fs from "node:fs";
import path from "node:path";
import type { Post, Project, Service, Video } from "@/lib/cms/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJson<T>(filename: string): T[] {
  const filePath = path.join(CONTENT_DIR, filename);
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content) as T[];
}

export function getProjects(): Project[] {
  return readJson<Project>("projects.json");
}

export function getFeaturedProjects(limit?: number): Project[] {
  const featured = getProjects().filter((project) => project.featured);
  return limit ? featured.slice(0, limit) : featured;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getPosts(): Post[] {
  return readJson<Post>("posts.json");
}

export function getFeaturedPosts(limit?: number): Post[] {
  const featured = getPosts().filter((post) => post.featured);
  return limit ? featured.slice(0, limit) : featured;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function getVideos(): Video[] {
  return readJson<Video>("videos.json");
}

export function getMainFeaturedVideo(): Video | undefined {
  return getVideos().find((video) => video.mainFeature);
}

export function getFeaturedVideos(): Video[] {
  return getVideos().filter((video) => video.featuredVideo);
}

export function getVideoBySlug(slug: string): Video | undefined {
  return getVideos().find((video) => video.slug === slug);
}

export function getServices(): Service[] {
  return readJson<Service>("services.json");
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((service) => service.slug === slug);
}

export function getHomeFeaturedVideos(): {
  main: Video | undefined;
  sidebar: Video[];
} {
  const videos = getVideos();
  const main = videos.find((video) => video.mainFeature) ?? videos.find((video) => video.featuredVideo);
  const sidebar = videos
    .filter((video) => video.featuredVideo && video.slug !== main?.slug)
    .slice(0, 4);

  return { main, sidebar };
}

export function getYoutubePageFeaturedVideos(): {
  main: Video | undefined;
  sidebar: Video[];
} {
  return getHomeFeaturedVideos();
}
