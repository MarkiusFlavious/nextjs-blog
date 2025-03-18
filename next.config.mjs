/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'headless.digitalhumanitydev.co.za',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
