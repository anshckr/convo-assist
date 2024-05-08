const withPWAInit = require('next-pwa');

// const runtimeCaching = require('./app/lib/cache.js');
const runtimeCaching = require('next-pwa/cache');

const isDev = process.env.NODE_ENV !== 'production';

const customRuntimeCaching = runtimeCaching.map((entry) => {
  const newEntry = { ...entry };

  if (entry.options.cacheName === 'cross-origin') {
    // NetworkOnly for cross-origin requests
    newEntry.handler = 'NetworkOnly';

    delete newEntry.options.networkTimeoutSeconds;
  }

  return newEntry;
});

const withPWA = withPWAInit({
  dest: 'public',
  disable: isDev,

  exclude: [
    // add buildExcludes here
    ({ asset, compilation }) => {
      if (
        asset.name.startsWith('server/') ||
        asset.name.match(
          /^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/,
        )
      ) {
        return true;
      }
      if (isDev && !asset.name.startsWith('static/runtime/')) {
        return true;
      }
      return false;
    },
  ],

  register: true,
  scope: '/',
  sw: 'convo-worker.js',
  runtimeCaching: customRuntimeCaching,
  buildExcludes: [
    /\.map$/, // dont cache map files
  ],
  reloadOnOnline: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: !isDev,
  reactStrictMode: false,
  swcMinify: !isDev,
  compiler: {
    removeConsole: !isDev
      ? {
          exclude: ['error'],
        }
      : {},
  },
};

module.exports = withPWA(nextConfig);
