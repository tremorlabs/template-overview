/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/support-dashboard",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
