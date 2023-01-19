import type { GatsbyConfig } from 'gatsby';
import * as dotenv from 'dotenv';

dotenv.config();

const pathPrefix = '/gatsby-microcms-plus';
const url = new URL(pathPrefix, 'https://cieloazul310.github.io');
const siteUrl = url.toString();

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gatsby microCMS Plus`,
    description: `Gatsby + microCMS + Chakra UI`,
    author: `cieloazul310`,
    siteUrl,
  },
  pathPrefix,
  graphqlTypegen: false,
  plugins: [
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
        /**
         * @property {boolean} [isBaseProvider=false]
         * if true, will render `<ChakraBaseProvider>`
         */
        isBaseProvider: false,
      },
    },
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.MICROCMS_APIKEY,
        serviceId: 'cieloazul310',
        apis: [
          { endpoint: 'hello', format: 'object' },
          { endpoint: 'blogs', format: 'list' },
          { endpoint: 'categories', format: 'list' },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};

export default config;
