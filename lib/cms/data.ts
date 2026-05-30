import {
  toDevProject,
  toPost,
  toProject,
  toService,
  toVideo,
} from "@/lib/cms/mappers";
import type { DevProject, Post, Project, Service, Video } from "@/lib/cms/types";
import { prisma } from "@/lib/db";

export async function getProjects(): Promise<Project[]> {
  const records = await prisma.project.findMany({ orderBy: { name: "asc" } });
  return records.map(toProject);
}

export async function getFeaturedProjects(limit?: number): Promise<Project[]> {
  const featured = (await getProjects()).filter((project) => project.featured);
  return limit ? featured.slice(0, limit) : featured;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const record = await prisma.project.findUnique({ where: { slug } });
  return record ? toProject(record) : undefined;
}

export async function getDevProjects(): Promise<DevProject[]> {
  const records = await prisma.devProject.findMany({ orderBy: { name: "asc" } });
  return records.map(toDevProject);
}

export async function getDevProjectBySlug(slug: string): Promise<DevProject | undefined> {
  const record = await prisma.devProject.findUnique({ where: { slug } });
  return record ? toDevProject(record) : undefined;
}

export async function getPosts(): Promise<Post[]> {
  const records = await prisma.post.findMany({ orderBy: { name: "asc" } });
  return records.map(toPost);
}

export async function getFeaturedPosts(limit?: number): Promise<Post[]> {
  const featured = (await getPosts()).filter((post) => post.featured);
  return limit ? featured.slice(0, limit) : featured;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const record = await prisma.post.findUnique({ where: { slug } });
  return record ? toPost(record) : undefined;
}

export async function getVideos(): Promise<Video[]> {
  const records = await prisma.video.findMany({ orderBy: { title: "asc" } });
  return records.map(toVideo);
}

export async function getMainFeaturedVideo(): Promise<Video | undefined> {
  const record = await prisma.video.findFirst({ where: { mainFeature: true } });
  return record ? toVideo(record) : undefined;
}

export async function getFeaturedVideos(): Promise<Video[]> {
  const records = await prisma.video.findMany({
    where: { featuredVideo: true },
    orderBy: { title: "asc" },
  });
  return records.map(toVideo);
}

export async function getVideoBySlug(slug: string): Promise<Video | undefined> {
  const record = await prisma.video.findUnique({ where: { slug } });
  return record ? toVideo(record) : undefined;
}

export async function getServices(): Promise<Service[]> {
  const records = await prisma.service.findMany({ orderBy: { name: "asc" } });
  return records.map(toService);
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const record = await prisma.service.findUnique({ where: { slug } });
  return record ? toService(record) : undefined;
}

export async function getHomeFeaturedVideos(): Promise<{
  main: Video | undefined;
  sidebar: Video[];
}> {
  const videos = await getVideos();
  const main =
    videos.find((video) => video.mainFeature) ??
    videos.find((video) => video.featuredVideo);
  const sidebar = videos
    .filter((video) => video.featuredVideo && video.slug !== main?.slug)
    .slice(0, 4);

  return { main, sidebar };
}

export async function getYoutubePageFeaturedVideos(): Promise<{
  main: Video | undefined;
  sidebar: Video[];
}> {
  return getHomeFeaturedVideos();
}
