import type { GatsbyConfig } from 'gatsby';
import * as dotenv from 'dotenv';

dotenv.config();

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gatsby microCMS Example`,
    description: `Gatsby + microCMS`,
    author: `cieloazul310`,
  },
  pathPrefix: '/gatsby-microcms',
  plugins: [
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.MICROCMS_APIKEY,
        serviceId: 'cieloazul310',
        apis: [
          { endpoint: 'hello', format: 'object' },
          { endpoint: 'blogs', format: 'list' },
        ],
      },
    },
  ],
};

export default config;
