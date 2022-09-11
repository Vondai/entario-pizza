/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['foodish-api.herokuapp.com']
	}
};

module.exports = nextConfig;
