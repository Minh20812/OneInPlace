// 🧠 Chuyển timestamp sang "2 hours ago", "5 minutes ago", ...
export const getTimeAgo = (dateInput) => {
  const now = new Date();
  const date = new Date(dateInput);
  const diff = Math.floor((now - date) / 1000); // in seconds

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} day ago`;

  return date.toLocaleDateString();
};
