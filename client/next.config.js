/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {},
  env: {
    NEXT_PUBLIC_WS_URL: 'ws://localhost:8000',
    NEXT_PUBLIC_API_URL: 'http://localhost:8000'
  }
}

module.exports = nextConfig