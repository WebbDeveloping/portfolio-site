"use server";

import { redirect } from "next/navigation";
import {
  type AdminFormState,
  isUniqueConstraintError,
  saveFailed,
  validationFailed,
} from "@/lib/admin/action-state";
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

function projectFormExtras(formData: FormData) {
  return { featured: parseCheckbox(formData, "featured") };
}

function postFormExtras(formData: FormData) {
  return { featured: parseCheckbox(formData, "featured") };
}

function videoFormExtras(formData: FormData) {
  return {
    featuredVideo: parseCheckbox(formData, "featuredVideo"),
    mainFeature: parseCheckbox(formData, "mainFeature"),
  };
}

function devProjectFormExtras(formData: FormData, raw: Record<string, string>) {
  return {
    featured: parseCheckbox(formData, "featured"),
    features: raw.features ?? "",
  };
}

export async function createProject(
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const extras = projectFormExtras(formData);
  const result = projectSchema.safeParse({ ...raw, ...extras });

  if (!result.success) {
    return validationFailed(raw, extras, result.error);
  }

  const parsed = result.data;

  try {
    await prisma.project.create({
      data: {
        ...parsed,
        additionalPhotos: parsed.additionalPhotos,
        services: parsed.services,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return saveFailed(raw, extras, undefined, { slug: "This slug is already in use" });
    }
    return saveFailed(raw, extras);
  }

  revalidateProjectPaths(parsed.slug);
  redirect(`/admin/projects`);
}

export async function updateProject(
  id: string,
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const extras = projectFormExtras(formData);
  const result = projectSchema.safeParse({ ...raw, ...extras });

  if (!result.success) {
    return validationFailed(raw, extras, result.error);
  }

  const parsed = result.data;

  try {
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
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return saveFailed(raw, extras, undefined, { slug: "This slug is already in use" });
    }
    return saveFailed(raw, extras);
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

export async function createPost(
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const extras = postFormExtras(formData);
  const result = postSchema.safeParse({ ...raw, ...extras });

  if (!result.success) {
    return validationFailed(raw, extras, result.error);
  }

  const parsed = result.data;

  try {
    await prisma.post.create({ data: parsed });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return saveFailed(raw, extras, undefined, { slug: "This slug is already in use" });
    }
    return saveFailed(raw, extras);
  }

  revalidatePostPaths(parsed.slug);
  redirect("/admin/posts");
}

export async function updatePost(
  id: string,
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const extras = postFormExtras(formData);
  const result = postSchema.safeParse({ ...raw, ...extras });

  if (!result.success) {
    return validationFailed(raw, extras, result.error);
  }

  const parsed = result.data;

  try {
    const existing = await prisma.post.findUniqueOrThrow({ where: { id } });
    await prisma.post.update({ where: { id }, data: parsed });
    revalidatePostPaths(existing.slug);
    if (existing.slug !== parsed.slug) {
      revalidatePostPaths(parsed.slug);
    }
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return saveFailed(raw, extras, undefined, { slug: "This slug is already in use" });
    }
    return saveFailed(raw, extras);
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

export async function createVideo(
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const extras = videoFormExtras(formData);
  const result = videoSchema.safeParse({ ...raw, ...extras });

  if (!result.success) {
    return validationFailed(raw, extras, result.error);
  }

  const parsed = result.data;

  try {
    if (parsed.mainFeature) {
      await unsetVideoMainFeature();
    }

    await prisma.video.create({ data: parsed });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return saveFailed(raw, extras, undefined, { slug: "This slug is already in use" });
    }
    return saveFailed(raw, extras);
  }

  revalidateVideoPaths(parsed.slug);
  redirect("/admin/videos");
}

export async function updateVideo(
  id: string,
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const extras = videoFormExtras(formData);
  const result = videoSchema.safeParse({ ...raw, ...extras });

  if (!result.success) {
    return validationFailed(raw, extras, result.error);
  }

  const parsed = result.data;

  try {
    if (parsed.mainFeature) {
      await unsetVideoMainFeature(id);
    }

    const existing = await prisma.video.findUniqueOrThrow({ where: { id } });
    await prisma.video.update({ where: { id }, data: parsed });
    revalidateVideoPaths(existing.slug);
    if (existing.slug !== parsed.slug) {
      revalidateVideoPaths(parsed.slug);
    }
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return saveFailed(raw, extras, undefined, { slug: "This slug is already in use" });
    }
    return saveFailed(raw, extras);
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

export async function createDevProject(
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const extras = devProjectFormExtras(formData, raw);
  const result = devProjectSchema.safeParse({ ...raw, ...extras });

  if (!result.success) {
    return validationFailed(raw, extras, result.error);
  }

  const parsed = result.data;

  try {
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
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return saveFailed(raw, extras, undefined, { slug: "This slug is already in use" });
    }
    return saveFailed(raw, extras);
  }

  revalidateDevProjectPaths(parsed.slug);
  redirect("/admin/dev-projects");
}

export async function updateDevProject(
  id: string,
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const extras = devProjectFormExtras(formData, raw);
  const result = devProjectSchema.safeParse({ ...raw, ...extras });

  if (!result.success) {
    return validationFailed(raw, extras, result.error);
  }

  const parsed = result.data;

  try {
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
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return saveFailed(raw, extras, undefined, { slug: "This slug is already in use" });
    }
    return saveFailed(raw, extras);
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

export async function createService(
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const extras: Record<string, string | boolean> = {};
  const result = serviceSchema.safeParse(raw);

  if (!result.success) {
    return validationFailed(raw, extras, result.error);
  }

  const parsed = result.data;

  try {
    await prisma.service.create({
      data: {
        ...parsed,
        projects: parsed.projects,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return saveFailed(raw, extras, undefined, { slug: "This slug is already in use" });
    }
    return saveFailed(raw, extras);
  }

  revalidateServicePaths();
  redirect("/admin/services");
}

export async function updateService(
  id: string,
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const raw = formDataToObject(formData);
  const extras: Record<string, string | boolean> = {};
  const result = serviceSchema.safeParse(raw);

  if (!result.success) {
    return validationFailed(raw, extras, result.error);
  }

  const parsed = result.data;

  try {
    await prisma.service.update({
      where: { id },
      data: {
        ...parsed,
        projects: parsed.projects,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return saveFailed(raw, extras, undefined, { slug: "This slug is already in use" });
    }
    return saveFailed(raw, extras);
  }

  revalidateServicePaths();
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await prisma.service.delete({ where: { id } });
  revalidateServicePaths();
  redirect("/admin/services");
}
