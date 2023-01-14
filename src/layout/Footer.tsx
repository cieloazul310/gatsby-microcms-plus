import * as React from 'react';
import { Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import useSiteMetadata from '../utils/useSiteMetadata';

function Footer() {
  const { author } = useSiteMetadata();
  return (
    <Flex as="footer" alignItems="center" direction="column" p={2} gap={2}>
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
