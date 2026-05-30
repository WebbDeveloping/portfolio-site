"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import {
  revalidateDevProjectPaths,
  revalidatePostPaths,
  revalidateProjectPaths,
  revalidateServicePaths,
  revalidateVideoPaths,
} from "@/lib/admin/revalidate";
import {
  devProjectSchema,
  formDataToObject,
  parseCheckbox,
  postSchema,
  projectSchema,
  serviceSchema,
  videoSchema,
} from "@/lib/admin/schemas";
import { prisma } from "@/lib/db";

async function unsetVideoMainFeature(excludeId?: string) {
  await prisma.video.updateMany({
    where: excludeId ? { id: { not: excludeId } } : {},
    data: { mainFeature: false },
  });
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const parsed = projectSchema.parse({
    ...raw,
    featured: parseCheckbox(formData, "featured"),
  });

  await prisma.project.create({
    data: {
      ...parsed,
      additionalPhotos: parsed.additionalPhotos,
      services: parsed.services,
    },
  });

  revalidateProjectPaths(parsed.slug);
  redirect(`/admin/projects`);
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const parsed = projectSchema.parse({
    ...raw,
    featured: parseCheckbox(formData, "featured"),
  });

  const existing = await prisma.project.findUniqueOrThrow({ where: { id } });
  await prisma.project.update({
    where: { id },
    data: {
      ...parsed,
      additionalPhotos: parsed.additionalPhotos,
      services: parsed.services,
    },
  });

  revalidateProjectPaths(existing.slug);
  if (existing.slug !== parsed.slug) {
    revalidateProjectPaths(parsed.slug);
  }
  redirect(`/admin/projects`);
}

export async function deleteProject(id: string) {
  await requireAdmin();
  const existing = await prisma.project.findUniqueOrThrow({ where: { id } });
  await prisma.project.delete({ where: { id } });
  revalidateProjectPaths(existing.slug);
  redirect("/admin/projects");
}

export async function createPost(formData: FormData) {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const parsed = postSchema.parse({
    ...raw,
    featured: parseCheckbox(formData, "featured"),
  });

  await prisma.post.create({ data: parsed });
  revalidatePostPaths(parsed.slug);
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const parsed = postSchema.parse({
    ...raw,
    featured: parseCheckbox(formData, "featured"),
  });

  const existing = await prisma.post.findUniqueOrThrow({ where: { id } });
  await prisma.post.update({ where: { id }, data: parsed });
  revalidatePostPaths(existing.slug);
  if (existing.slug !== parsed.slug) {
    revalidatePostPaths(parsed.slug);
  }
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await requireAdmin();
  const existing = await prisma.post.findUniqueOrThrow({ where: { id } });
  await prisma.post.delete({ where: { id } });
  revalidatePostPaths(existing.slug);
  redirect("/admin/posts");
}

export async function createVideo(formData: FormData) {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const parsed = videoSchema.parse({
    ...raw,
    featuredVideo: parseCheckbox(formData, "featuredVideo"),
    mainFeature: parseCheckbox(formData, "mainFeature"),
  });

  if (parsed.mainFeature) {
    await unsetVideoMainFeature();
  }

  await prisma.video.create({ data: parsed });
  revalidateVideoPaths(parsed.slug);
  redirect("/admin/videos");
}

export async function updateVideo(id: string, formData: FormData) {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const parsed = videoSchema.parse({
    ...raw,
    featuredVideo: parseCheckbox(formData, "featuredVideo"),
    mainFeature: parseCheckbox(formData, "mainFeature"),
  });

  if (parsed.mainFeature) {
    await unsetVideoMainFeature(id);
  }

  const existing = await prisma.video.findUniqueOrThrow({ where: { id } });
  await prisma.video.update({ where: { id }, data: parsed });
  revalidateVideoPaths(existing.slug);
  if (existing.slug !== parsed.slug) {
    revalidateVideoPaths(parsed.slug);
  }
  redirect("/admin/videos");
}

export async function deleteVideo(id: string) {
  await requireAdmin();
  const existing = await prisma.video.findUniqueOrThrow({ where: { id } });
  await prisma.video.delete({ where: { id } });
  revalidateVideoPaths(existing.slug);
  redirect("/admin/videos");
}

export async function createDevProject(formData: FormData) {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const parsed = devProjectSchema.parse({
    ...raw,
    featured: parseCheckbox(formData, "featured"),
    features: raw.features ?? "",
  });

  await prisma.devProject.create({
    data: {
      ...parsed,
      stack: parsed.stack,
      features: parsed.features?.length ? parsed.features : undefined,
      githubUrl: parsed.githubUrl ?? null,
      liveUrl: parsed.liveUrl ?? null,
      heroImage: parsed.heroImage ?? null,
      accentColor: parsed.accentColor ?? null,
      year: parsed.year ?? null,
      problem: parsed.problem ?? null,
      solution: parsed.solution ?? null,
    },
  });

  revalidateDevProjectPaths(parsed.slug);
  redirect("/admin/dev-projects");
}

export async function updateDevProject(id: string, formData: FormData) {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const parsed = devProjectSchema.parse({
    ...raw,
    featured: parseCheckbox(formData, "featured"),
    features: raw.features ?? "",
  });

  const existing = await prisma.devProject.findUniqueOrThrow({ where: { id } });
  await prisma.devProject.update({
    where: { id },
    data: {
      ...parsed,
      stack: parsed.stack,
      features: parsed.features?.length ? parsed.features : undefined,
      githubUrl: parsed.githubUrl ?? null,
      liveUrl: parsed.liveUrl ?? null,
      heroImage: parsed.heroImage ?? null,
      accentColor: parsed.accentColor ?? null,
      year: parsed.year ?? null,
      problem: parsed.problem ?? null,
      solution: parsed.solution ?? null,
    },
  });

  revalidateDevProjectPaths(existing.slug);
  if (existing.slug !== parsed.slug) {
    revalidateDevProjectPaths(parsed.slug);
  }
  redirect("/admin/dev-projects");
}

export async function deleteDevProject(id: string) {
  await requireAdmin();
  const existing = await prisma.devProject.findUniqueOrThrow({ where: { id } });
  await prisma.devProject.delete({ where: { id } });
  revalidateDevProjectPaths(existing.slug);
  redirect("/admin/dev-projects");
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const parsed = serviceSchema.parse(raw);

  await prisma.service.create({
    data: {
      ...parsed,
      projects: parsed.projects,
    },
  });

  revalidateServicePaths();
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const parsed = serviceSchema.parse(raw);

  await prisma.service.update({
    where: { id },
    data: {
      ...parsed,
      projects: parsed.projects,
    },
  });

  revalidateServicePaths();
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await prisma.service.delete({ where: { id } });
  revalidateServicePaths();
  redirect("/admin/services");
}
