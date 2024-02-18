/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env:{
    USER_SERVICE_PATH: "http://localhost:3005/"
  }
}