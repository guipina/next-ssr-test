/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // Do not let internal paths be access canonically
        source: '/_device-types/:path*',
        destination: '/404',
        permanent: true,
      }
    ]
  },
}
module.exports = nextConfig


/*

async rewrites() {
    return [{
      source: '/_device-types/:path*',

    }]
  },
*/