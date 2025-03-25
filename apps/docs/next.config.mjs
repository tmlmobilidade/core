/* * */

import { createMDX } from 'fumadocs-mdx/next'

/* * */

/** @type {import('next').NextConfig} */
const config = {
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  reactStrictMode: true,
}

/* * */

export default createMDX()(config)
