import type {
  DevProject as DevProjectModel,
  Post as PostModel,
  Project as ProjectModel,
  Service as ServiceModel,
  Video as VideoModel,
} from "@prisma/client";
import type { DevProject, Post, Project, Service, Video } from "@/lib/cms/types";

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function toProject(record: ProjectModel): Project {
  return {
    name: record.name,
    slug: record.slug,
    client: record.client,
    clientLogo: record.clientLogo,
    servicesRendered: record.servicesRendered,
    featured: record.featured,
    mainImage: record.mainImage,
    largeDesktopImg: record.largeDesktopImg,
    standardDesktopImg: record.standardDesktopImg,
    tabletImg: record.tabletImg,
    mobileImg: record.mobileImg,
    additionalPhotos: asStringArray(record.additionalPhotos),
    projectOverview: record.projectOverview,
    projectContribution: record.projectContribution,
    clientFeedback: record.clientFeedback,
    finalThought: record.finalThought,
    services: asStringArray(record.services),
    liveLink: record.liveLink,
    platformLogo: record.platformLogo,
  };
}

export function toPost(record: PostModel): Post {
  return {
    name: record.name,
    slug: record.slug,
    postBody: record.postBody,
    postSummary: record.postSummary,
    mainImage: record.mainImage,
    thumbnailImage: record.thumbnailImage,
    featured: record.featured,
  };
}

export function toVideo(record: VideoModel): Video {
  return {
    title: record.title,
    slug: record.slug,
    featuredImage: record.featuredImage,
    youtubeUrl: record.youtubeUrl,
    featuredVideo: record.featuredVideo,
    mainFeature: record.mainFeature,
    publishedOn: record.publishedOn,
  };
}

export function toDevProject(record: DevProjectModel): DevProject {
  return {
    name: record.name,
    slug: record.slug,
    tagline: record.tagline,
    description: record.description,
    stack: asStringArray(record.stack),
    githubUrl: record.githubUrl ?? undefined,
    liveUrl: record.liveUrl ?? undefined,
    featured: record.featured,
    heroImage: record.heroImage ?? undefined,
    accentColor: record.accentColor ?? undefined,
    year: record.year ?? undefined,
    problem: record.problem ?? undefined,
    solution: record.solution ?? undefined,
    features: record.features ? asStringArray(record.features) : undefined,
  };
}

export function toService(record: ServiceModel): Service {
  return {
    name: record.name,
    slug: record.slug,
    description: record.description,
    icon: record.icon,
    color: record.color,
    projects: asStringArray(record.projects),
  };
}
