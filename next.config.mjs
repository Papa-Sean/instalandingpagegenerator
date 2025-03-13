// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/tts',
				destination: 'http://localhost:5000/tts',
			},
		];
	},
};

export default nextConfig;
