export function getTimeAgo(timestamp: number | Date | string) {
  const now = new Date();
  let time: Date;

  if (typeof timestamp === "number") {
    // Treat as milliseconds since epoch
    time = new Date(timestamp);
  } else if (typeof timestamp === "string") {
    time = new Date(timestamp);
  } else {
    time = timestamp;
  }

  const diffMs = now.getTime() - time.getTime();

  if (diffMs < 0) return "in the future";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `just now`;
  if (minutes < 60) return `${minutes} m ago`;
  if (hours < 24) return `${hours} h ago`;
  if (days < 7) return `${days} d ago`;
  if (weeks < 5) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}
