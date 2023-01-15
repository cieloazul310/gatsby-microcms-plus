import * as React from 'react';
import { Flex, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import useSiteMetadata from '../utils/useSiteMetadata';

function Footer() {
  const { title, author } = useSiteMetadata();
  return (
    <Flex as="footer" alignItems="center" direction="column" py={16} gap={2} bgGradient="linear(to-b, white, primary.200)">
      <Heading as="h6" size="md">
        {title}
      </Heading>
      <Text fontSize="md">
        © {new Date().getFullYear()} {author} All rights reserved.
      </Text>
      <Text fontSize="sm">
        Built with
        {` `}
        <ChakraLink href="https://www.gatsbyjs.com/" isExternal>
          Gatsby
        </ChakraLink>
      </Text>
    </Flex>
  );
}

export default Footer;
