import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for static content delivery
  output: 'export', // Enables static HTML export
  images: {
    unoptimized: true, // Required for static export
  },
  // Enable compression and optimizations
  compress: true,
  // Optimize production builds
  poweredByHeader: false,
  // Ensure proper static generation
  trailingSlash: false,
  // Generate static pages at build time
  generateBuildId: async () => {
    // Use a consistent build ID for static generation
    return 'static-build';
  },
};

export default nextConfig;
