const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';
  const API_PROD_URL = process.env.NEXT_PUBLIC_API_PROD_URL
  const env = {
    API_PROD_URL: (() => {
      if (isDev) return API_PROD_URL;
      if (isProd) {
        return API_PROD_URL;
      }
      if (isStaging) return API_PROD_URL;
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
    API_BASE_URL: 'http://localhost:8080/api',
  };
  const redirects = () => {
    return [
      {
        source: '/',
        destination: '/en/',
        permanent: false,
      },
    ];
  };
  const images = {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1:8000',
      },
      {
        protocol: 'https',
        hostname: 'fastkart-admin-json.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'laravel.pixelstrap.net',
      },
      {
        protocol: 'https',
        hostname: 'react.pixelstrap.net',
      },
    ],
  };

  return {
    env,
    redirects,
    images,
  };
};
