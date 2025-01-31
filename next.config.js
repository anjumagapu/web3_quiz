/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Make sure there's no basePath or custom output directory configured
  // unless you specifically need them
}

module.exports = nextConfig 