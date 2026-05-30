const WEBFLOW_ROUTES: Record<string, string> = {
  "index.html": "/",
  "about.html": "/about",
  "projects.html": "/projects",
  "contact.html": "/contact",
  "links.html": "/links",
  "joe-webb-youtube-videos.html": "/joe-webb-youtube-videos",
};

const SITE_HOSTS = new Set(["www.joewebbdesigns.com", "joewebbdesigns.com"]);

function normalizeSitePath(pathname: string): string {
  if (pathname.startsWith("/post/")) return pathname;
  if (pathname.startsWith("/project/")) return pathname;
  return pathname;
}

export function webflowRoute(href: string): string {
  if (href in WEBFLOW_ROUTES) {
    return WEBFLOW_ROUTES[href];
  }

  if (href.startsWith("/") && !href.startsWith("//")) {
    return href;
  }

  try {
    const url = new URL(href);
    if (SITE_HOSTS.has(url.hostname)) {
      return normalizeSitePath(url.pathname);
    }
  } catch {
    // External or relative URLs that aren't in the map stay as-is.
  }

  return href;
}

export function isInternalWebflowLink(href: string): boolean {
  if (href in WEBFLOW_ROUTES) {
    return true;
  }

  if (href.startsWith("/") && !href.startsWith("//")) {
    return true;
  }

  try {
    const url = new URL(href);
    return SITE_HOSTS.has(url.hostname) && normalizeSitePath(url.pathname) === url.pathname;
  } catch {
    return false;
  }
}
