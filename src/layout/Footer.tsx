import * as React from 'react';
import { Flex, Heading, Text, useColorMode } from '@chakra-ui/react';
import Link from '../components/Link';
import useSiteMetadata from '../utils/useSiteMetadata';

function Footer() {
  const { title, author } = useSiteMetadata();
  const { colorMode } = useColorMode();
  const bgGradient = colorMode === 'light' ? 'linear(to-b, white, primary.300)' : 'linear(to-b, gray.800, primary.700)';

  return (
    <Flex as="footer" alignItems="center" direction="column" py={16} gap={2} bgGradient={bgGradient}>
      <Heading as="h6" size="md">
        <Link href="/" color="inherit">
          {title}
        </Link>
      </Heading>
      <Text fontSize="md">
        © {new Date().getFullYear()} {author} All rights reserved.
      </Text>
      <Text fontSize="sm">
        Built with
        {` `}
        <Link href="https://www.gatsbyjs.com/">Gatsby</Link>
      </Text>
    </Flex>
  );
}

export default Footer;
