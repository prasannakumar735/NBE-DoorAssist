import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/quote", destination: "/contact", permanent: true },
      { source: "/cold-storage", destination: "/solutions", permanent: true },
      {
        source: "/products/high-speed-rapid-roller-door-industrial-grade",
        destination: "/rapid-roller-doors/high-speed-fabric-rapid-door",
        permanent: true,
      },
      {
        source: "/products/heavy-duty-commercial-rapid-door-quick-response",
        destination: "/rapid-roller-doors/steel-rapid-roll-door",
        permanent: true,
      },
      {
        source: "/products/ambient-cold-chain-roller-door-insulated",
        destination: "/rapid-roller-doors/insulated-freezer-rapid-door",
        permanent: true,
      },
      {
        source: "/rapid-roller-doors/impact-pvc-swing-door",
        destination: "/pvc-strip-curtains/pvc-swing-doors",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
