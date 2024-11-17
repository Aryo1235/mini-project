export const getRedirectURL = (path = "") => {
  // Dapatkan URL dari variabel lingkungan, default ke localhost jika tidak ada
  let url =
    import.meta.env.VITE_SITE_URL ??
    import.meta.env.VITE_VERCEL_URL ??
    "http://localhost:3000";

  // Pastikan URL memiliki `https://` jika bukan localhost
  url = url.startsWith("http") ? url : `https://${url}`;

  // Tambahkan trailing `/` jika belum ada
  url = url.endsWith("/") ? url : `${url}/`;

  return `${url}${path}`;
};
