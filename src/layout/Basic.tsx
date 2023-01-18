import * as React from 'react';
import { Flex, VStack, IconButton, Drawer, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useLocation } from '@reach/router';
import Jumbotron from '../components/Jumbotron';
import PaperButton from '../components/PaperButton';
import Sidebar from './Sidebar';
import DrawerContent from './DrawerContent';

type BasicLayoutProps = React.PropsWithChildren<{
  title: string;
  description?: string;
  jumbotronHeight?: number;
  sidebarContents?: React.ReactNode;
  drawerContents?: React.ReactNode;
  disableSidebar?: boolean;
}>;

function BasicLayout({
  children,
  title,
  description,
  jumbotronHeight,
  sidebarContents,
  drawerContents,
  disableSidebar = false,
}: BasicLayoutProps) {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<null>(null);

  return (
    <>
      <Jumbotron title={title} description={description} height={jumbotronHeight} />
      <Flex py={4} px={2}>
        <VStack flexGrow={1} spacing={4} align="stretch" px={[0, 2]} maxWidth="100%">
          {children}
          {pathname !== '/' ? <PaperButton href="/">トップページへ</PaperButton> : null}
        </VStack>
        {!disableSidebar ? (
          <VStack
            spacing={4}
            align="stretch"
            width={[0, 0, '240px', '320px']}
            display={['none', 'none', 'block']}
            px={2}
            pb={8}
            flexShrink={0}
            position="sticky"
            // maxHeight="calc(100vh - 56px)"
            overflowY="auto"
            top="calc(56px + 1rem)"
            right={0}
          >
            {sidebarContents}
            <Sidebar />
          </VStack>
        ) : null}
      </Flex>
      <IconButton
        colorScheme="primary"
        icon={<HamburgerIcon />}
        size="lg"
        aria-label="Menu"
        display={['block', 'block', 'none']}
        position="fixed"
        bottom={4}
        right={4}
        zIndex="sticky"
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent onClose={onClose} drawerContents={drawerContents} />
      </Drawer>
    </>
  );
}

BasicLayout.defaultProps = {
  description: undefined,
  jumbotronHeight: undefined,
  sidebarContents: undefined,
  drawerContents: undefined,
  disableSidebar: false,
};

export default BasicLayout;
