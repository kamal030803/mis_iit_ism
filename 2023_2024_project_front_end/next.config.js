/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid'
])

module.exports = withTM({
  productionBrowserSourceMaps: true,
  trailingSlash: true,
  reactStrictMode: false,

  experimental: {
    esmExternals: true,
    // topLevelAwait: true
  },
  env: {
    //APIURL: 'https://tmsapi.iitism.ac.in/api/',
    APIURL: 'http://localhost:8000/api/',
    APIURLNotification: 'http://localhost:8000/',
    CSecretKey: 'mis@iitism',
    ImageUrl: 'https://mis.iitism.ac.in/assets/images/',
    FilePath: 'http://localhost:8000/',
    DefaultUserImage: '',
    TMSFOR: 'ISM',
    DownloadUrl: 'http://localhost:8000/',
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
})
