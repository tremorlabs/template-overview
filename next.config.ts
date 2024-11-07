import type { NextConfig } from "next"

const nextConfig: NextConfig = {
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
