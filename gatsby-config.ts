import type { GatsbyConfig } from 'gatsby';
import * as dotenv from 'dotenv';

dotenv.config();

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gatsby microCMS Example`,
    description: `Gatsby + microCMS`,
    author: `cieloazul310`,
  },
  pathPrefix: '/gatsby-microcms-plus',
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
        ],
      },
    },
  ],
};

export default config;
