/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["ja"],
    defaultLocale: "ja",
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts"],
};

module.exports = nextConfig;
