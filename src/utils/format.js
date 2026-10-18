/** "Libraries & Frameworks" -> "libraries_frameworks" */
export function snakeCase(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/** "AI & Development" -> "aiDevelopment" */
export function camelCase(text) {
  return snakeCase(text).replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
}

/** Short project slug for window titles, e.g. "cybersec-reasoner". */
export function projectSlug(title) {
  return title
    .split(/\s[–-]\s|\s\[/)[0]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 36);
}

/** Deterministic 7-char hex "commit hash" for decorative git-log styling. */
export function commitHash(text) {
  let hash = 5381;
  for (const ch of text) hash = ((hash << 5) + hash + ch.charCodeAt(0)) >>> 0;
  return hash.toString(16).padStart(8, '0').slice(0, 7);
}

export function linkIcon(href) {
  if (href.includes('github.com')) return 'fab fa-github';
  if (href.includes('huggingface.co')) return 'fa-solid fa-cube';
  return 'fa-solid fa-arrow-up-right-from-square';
}
