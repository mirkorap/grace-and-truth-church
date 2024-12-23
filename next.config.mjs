import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
};

export default withPlaiceholder(nextConfig);
