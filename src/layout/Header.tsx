import * as React from 'react';
import { Flex, Box, Spacer, Heading, ButtonGroup, Button, Hide } from '@chakra-ui/react';
import Link from '../components/Link';
import useGradientBox from '../utils/useGradientBox';
import useSiteMetadata from '../utils/useSiteMetadata';

function Header() {
  const { title } = useSiteMetadata();
  const { color, bgGradient } = useGradientBox();
  return (
    <Flex as="header" alignItems="center" gap={2} position="sticky" top={0} zIndex="sticky" color={color} bgGradient={bgGradient}>
      <Box px={4} py={2}>
        <Link
          href="/"
          _hover={{
            color: 'primary.100',
            textDecoration: 'none',
          }}
        >
          <Heading as="h1" size="md">
            {title}
          </Heading>
        </Link>
      </Box>
      <Spacer />
      <Hide below="sm">
        <ButtonGroup gap="2" px={4} py={2} colorScheme="primary">
          <Button>Sign Up</Button>
          <Button>Log in</Button>
        </ButtonGroup>
      </Hide>
    </Flex>
  );
}

export default Header;
