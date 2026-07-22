/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The live gallery photos are hosted on the initiative's own domain.
    // Swap or extend these patterns when you migrate the images to your own CDN.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.thehealthenlightinitiative.org",
      },
      {
        protocol: "https",
        hostname: "thehealthenlightinitiative.org",
      },
    ],
  },
};

export default nextConfig;
