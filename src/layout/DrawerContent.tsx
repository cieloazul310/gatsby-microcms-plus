import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import {
  Spacer,
  VStack,
  Button,
  IconButton,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent as ChakraDrawerContent,
  DrawerCloseButton,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import DrawerMenu from './DrawerMenu';
import useSiteMetadata from '../utils/useSiteMetadata';

type DrawerProps = {
  drawerContents?: React.ReactNode;
  onClose: () => void;
};

function DrawerContent({ drawerContents, onClose }: DrawerProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { title } = useSiteMetadata();
  return (
    <ChakraDrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>{title}</DrawerHeader>
      <DrawerBody>
        <VStack spacing={2} align="stretch">
          {drawerContents}
          <DrawerMenu />
        </VStack>
      </DrawerBody>
      <DrawerFooter>
        <IconButton icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode} aria-label="toggle color mode" />
        <Spacer />
        <Button as={GatsbyLink} mr={2} colorScheme="primary" to="/">
          トップページ
        </Button>
        <Button colorScheme="gray" onClick={onClose}>
          閉じる
        </Button>
      </DrawerFooter>
    </ChakraDrawerContent>
  );
}

DrawerContent.defaultProps = {
  drawerContents: undefined,
};

export default DrawerContent;
