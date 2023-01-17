import * as React from 'react';
import { Flex, Box, Spacer, Heading, ButtonGroup, Button, Hide, IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Link from '../components/Link';
import useGradientBox from '../utils/useGradientBox';
import useSiteMetadata from '../utils/useSiteMetadata';

function Header() {
  const { title } = useSiteMetadata();
  const { color, bgGradient } = useGradientBox();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      alignItems="center"
      gap={2}
      position="sticky"
      top={0}
      zIndex="sticky"
      color={color}
      bgGradient={bgGradient}
      height="56px"
    >
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
          <Button>About</Button>
          <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} aria-label="toggle color mode" />
        </ButtonGroup>
      </Hide>
    </Flex>
  );
}

export default Header;
