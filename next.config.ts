module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/weoe5nuj/production/**',
      },
    ],
    minimumCacheTTL: 60, // Reduce re-fetching time
  },
};
