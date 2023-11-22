// next.config.js
module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com", "images.pexels.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};
