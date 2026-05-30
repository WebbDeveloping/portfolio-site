export function parseBoolean(value: string): boolean {
  return value.trim().toLowerCase() === "true";
}

export function splitList(value: string, separator: ";" | "," = ";"): string[] {
  return value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function firstNonEmpty(...values: Array<string | undefined>): string {
  return values.find((value) => value && value.trim().length > 0) ?? "";
}

export function uniqueUrls(urls: string[]): string[] {
  return [...new Set(urls.filter(Boolean))];
}
