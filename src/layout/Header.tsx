import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Flex, Box, Spacer, Heading, Link as ChakraLink, ButtonGroup, Button, Hide } from '@chakra-ui/react';
import useSiteMetadata from '../utils/useSiteMetadata';

function Header() {
  const { title } = useSiteMetadata();
  return (
    <Flex
      as="header"
      alignItems="center"
      minWidth="max-content"
      gap={2}
      position="sticky"
      top={0}
      zIndex="sticky"
      bgColor="whiteAlpha.700"
      backdropFilter="blur(2px)"
    >
      <Box px={4} py={2}>
        <ChakraLink to="/" as={GatsbyLink}>
          <Heading
            as="h1"
            size="md"
            _hover={{
              color: 'blue.600',
            }}
          >
            {title}
          </Heading>
        </ChakraLink>
      </Box>
      <Spacer />
      <Hide below="sm">
        <ButtonGroup gap="2" px={4} py={2} colorScheme="blue">
          <Button>Sign Up</Button>
          <Button>Log in</Button>
        </ButtonGroup>
      </Hide>
    </Flex>
  );
}

export default Header;
