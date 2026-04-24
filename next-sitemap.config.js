/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://www.oficiosargentina.com.ar',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/panel/*', '/auth/*', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/panel', '/auth', '/api'] },
    ],
  },
};
