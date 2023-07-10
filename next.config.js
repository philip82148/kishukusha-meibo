/** @type {import('next').NextConfig} */
const nextConfig = { basePath: process.env.GITHUB_ACTIONS && '/kishukusha-meibo', output: 'export' }

module.exports = nextConfig
