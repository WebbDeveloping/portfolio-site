export function projectPath(slug: string): string {
  return `/project/${slug}`;
}

export function devProjectPath(slug: string): string {
  return `/dev-project/${slug}`;
}

export function postPath(slug: string): string {
  return `/post/${slug}`;
}

export function videoPath(slug: string): string {
  return `/youtube-video/${slug}`;
}
