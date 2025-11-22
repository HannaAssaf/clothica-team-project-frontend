import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	reactCompiler: true,
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "res.cloudinary.com" },
			{ protocol: "https", hostname: "ftp.goit.study" },
		],
	},
}

export default nextConfig
