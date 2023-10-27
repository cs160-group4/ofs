export default function getAvatarURL(path: string) {
  if (!path) return "/images/avatars/default.svg";
  else if (path.includes("http")) return path;
  else return "/" + path;
}
