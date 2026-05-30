import { revalidatePath } from "next/cache";

export function revalidateProjectPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/projects");
  if (slug) {
    revalidatePath(`/project/${slug}`);
  }
}

export function revalidatePostPaths(slug?: string) {
  revalidatePath("/");
  if (slug) {
    revalidatePath(`/post/${slug}`);
  }
}

export function revalidateVideoPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/joe-webb-youtube-videos");
  if (slug) {
    revalidatePath(`/youtube-video/${slug}`);
  }
}

export function revalidateDevProjectPaths(slug?: string) {
  revalidatePath("/dev-projects");
  if (slug) {
    revalidatePath(`/dev-project/${slug}`);
  }
}

export function revalidateServicePaths() {
  revalidatePath("/about");
}
