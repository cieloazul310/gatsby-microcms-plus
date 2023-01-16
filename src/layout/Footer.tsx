import * as React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import Link from '../components/Link';
import useSiteMetadata from '../utils/useSiteMetadata';

function Footer() {
  const { title, author } = useSiteMetadata();
  return (
    <Flex as="footer" alignItems="center" direction="column" py={16} gap={2} bgGradient="linear(to-b, white, primary.200)">
      <Link href="/">
        <Heading as="h6" size="md">
          {title}
        </Heading>
      </Link>
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
