/**
 * Converts a relative backend file or image path to a full URL using VITE_IMG_URL
 */
export const getFileUrl = (path) => {
  if (!path) return "";
  if (typeof path !== "string") return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("blob:") || path.startsWith("data:")) {
    return path;
  }
  const cleanPath = path.replace(/\\/g, "/");
  const base = import.meta.env.VITE_IMG_URL || "";
  const separator = base.endsWith("/") || cleanPath.startsWith("/") ? "" : "/";
  return `${base}${separator}${cleanPath}`;
};

export default getFileUrl;
