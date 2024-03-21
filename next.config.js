const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  const env = {
    API_PROD_URL: (() => {
      if (isDev) return 'http://localhost:8080/api/';
      if (isProd) {
        // Note: The code below needs to be uncommented, and you should use your domin where your API is hosted.
        // return 'Enter Your URL here'
        return 'http://localhost:8080/api/';
      }
      if (isStaging) return 'http://localhost:8080/api/';
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
