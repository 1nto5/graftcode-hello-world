import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // javonet-nodejs-sdk contains native Node.js modules that must not be bundled
  // by webpack. Marking it as external prevents build errors.
  serverExternalPackages: ["javonet-nodejs-sdk"],
};

export default nextConfig;
