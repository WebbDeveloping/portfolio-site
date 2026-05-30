import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import type { DevProject, Post, Project, Service, Video } from "../lib/cms/types";

const prisma = new PrismaClient();
const CONTENT_DIR = path.join(process.cwd(), "content");

function readJson<T>(filename: string): T[] {
  const filePath = path.join(CONTENT_DIR, filename);
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content) as T[];
}

async function main() {
  const projects = readJson<Project>("projects.json");
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      create: {
        slug: project.slug,
        name: project.name,
        client: project.client,
        clientLogo: project.clientLogo,
        servicesRendered: project.servicesRendered,
        featured: project.featured,
        mainImage: project.mainImage,
        largeDesktopImg: project.largeDesktopImg,
        standardDesktopImg: project.standardDesktopImg,
        tabletImg: project.tabletImg,
        mobileImg: project.mobileImg,
        additionalPhotos: project.additionalPhotos,
        projectOverview: project.projectOverview,
        projectContribution: project.projectContribution,
        clientFeedback: project.clientFeedback,
        finalThought: project.finalThought,
        services: project.services,
        liveLink: project.liveLink,
        platformLogo: project.platformLogo,
      },
      update: {
        name: project.name,
        client: project.client,
        clientLogo: project.clientLogo,
        servicesRendered: project.servicesRendered,
        featured: project.featured,
        mainImage: project.mainImage,
        largeDesktopImg: project.largeDesktopImg,
        standardDesktopImg: project.standardDesktopImg,
        tabletImg: project.tabletImg,
        mobileImg: project.mobileImg,
        additionalPhotos: project.additionalPhotos,
        projectOverview: project.projectOverview,
        projectContribution: project.projectContribution,
        clientFeedback: project.clientFeedback,
        finalThought: project.finalThought,
        services: project.services,
        liveLink: project.liveLink,
        platformLogo: project.platformLogo,
      },
    });
  }

  const posts = readJson<Post>("posts.json");
  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      create: {
        slug: post.slug,
        name: post.name,
        postBody: post.postBody,
        postSummary: post.postSummary,
        mainImage: post.mainImage,
        thumbnailImage: post.thumbnailImage,
        featured: post.featured,
      },
      update: {
        name: post.name,
        postBody: post.postBody,
        postSummary: post.postSummary,
        mainImage: post.mainImage,
        thumbnailImage: post.thumbnailImage,
        featured: post.featured,
      },
    });
  }

  const videos = readJson<Video>("videos.json");
  for (const video of videos) {
    await prisma.video.upsert({
      where: { slug: video.slug },
      create: {
        slug: video.slug,
        title: video.title,
        featuredImage: video.featuredImage,
        youtubeUrl: video.youtubeUrl,
        featuredVideo: video.featuredVideo,
        mainFeature: video.mainFeature,
        publishedOn: video.publishedOn,
      },
      update: {
        title: video.title,
        featuredImage: video.featuredImage,
        youtubeUrl: video.youtubeUrl,
        featuredVideo: video.featuredVideo,
        mainFeature: video.mainFeature,
        publishedOn: video.publishedOn,
      },
    });
  }

  const devProjects = readJson<DevProject>("dev-projects.json");
  for (const devProject of devProjects) {
    await prisma.devProject.upsert({
      where: { slug: devProject.slug },
      create: {
        slug: devProject.slug,
        name: devProject.name,
        tagline: devProject.tagline,
        description: devProject.description,
        stack: devProject.stack,
        githubUrl: devProject.githubUrl ?? null,
        liveUrl: devProject.liveUrl ?? null,
        featured: devProject.featured,
        heroImage: devProject.heroImage ?? null,
        accentColor: devProject.accentColor ?? null,
        year: devProject.year ?? null,
        problem: devProject.problem ?? null,
        solution: devProject.solution ?? null,
        features: devProject.features ?? undefined,
      },
      update: {
        name: devProject.name,
        tagline: devProject.tagline,
        description: devProject.description,
        stack: devProject.stack,
        githubUrl: devProject.githubUrl ?? null,
        liveUrl: devProject.liveUrl ?? null,
        featured: devProject.featured,
        heroImage: devProject.heroImage ?? null,
        accentColor: devProject.accentColor ?? null,
        year: devProject.year ?? null,
        problem: devProject.problem ?? null,
        solution: devProject.solution ?? null,
        features: devProject.features ?? undefined,
      },
    });
  }

  const services = readJson<Service>("services.json");
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      create: {
        slug: service.slug,
        name: service.name,
        description: service.description,
        icon: service.icon,
        color: service.color,
        projects: service.projects,
      },
      update: {
        name: service.name,
        description: service.description,
        icon: service.icon,
        color: service.color,
        projects: service.projects,
      },
    });
  }

  const counts = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.video.count(),
    prisma.devProject.count(),
    prisma.service.count(),
  ]);

  console.log("Seed complete:", {
    projects: counts[0],
    posts: counts[1],
    videos: counts[2],
    devProjects: counts[3],
    services: counts[4],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
