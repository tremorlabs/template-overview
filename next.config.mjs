/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/support",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
