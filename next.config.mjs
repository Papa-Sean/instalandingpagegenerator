// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/tts',
				destination: `${process.env.FLASK_API_URL}/tts`,
			},
		];
	},
};

export default nextConfig;
