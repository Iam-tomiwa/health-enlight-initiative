/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Keep remote patterns for CMS images and any externally hosted media.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.thehealthenlightinitiative.org",
      },
      {
        protocol: "https",
        hostname: "thehealthenlightinitiative.org",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
