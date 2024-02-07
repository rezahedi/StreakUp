/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {},
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
    ],
  },
}

module.exports = nextConfig
