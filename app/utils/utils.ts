export function getAvatarURL(path: string | null | undefined) {
  if (!path) return "/images/avatars/default.svg";
  else if (path.includes("http")) return path;
  else return "/" + path;
}

export function getImageUrl(path: string) {
  if (!path) return "/images/products/default.svg";
  else if (path.includes("http")) return path;
  else return "/" + path;
}
