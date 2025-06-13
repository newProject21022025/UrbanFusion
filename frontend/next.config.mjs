// @ts-check

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);


// // frontend/next.config.mjs

// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin();

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     async rewrites() {
//         return [
//           {
//             source: '/api/callback/:path*',
//             destination: 'https://urban-fusion-amber.vercel.app/callback/:path*'
//           }
//         ];
//       }
// };

// export default withNextIntl(nextConfig);