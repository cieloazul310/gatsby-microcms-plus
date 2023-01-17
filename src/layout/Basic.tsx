import * as React from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import { useLocation } from '@reach/router';
import Jumbotron from '../components/Jumbotron';
import PaperButton from '../components/PaperButton';
import Sidebar from './Sidebar';

type BasicLayoutProps = React.PropsWithChildren<{
  title: string;
  description?: string;
  jumbotronHeight?: number;
  sidebarContents?: React.ReactNode;
  disableSidebar?: boolean;
}>;

function BasicLayout({ children, title, description, jumbotronHeight, sidebarContents, disableSidebar = false }: BasicLayoutProps) {
  const { pathname } = useLocation();
  return (
    <>
      <Jumbotron title={title} description={description} height={jumbotronHeight} />
      <Flex py={4} px={2}>
        <VStack flexGrow={1} spacing={4} align="stretch" px={[0, 2]} maxWidth="100%">
          {children}
          {pathname !== '/' ? <PaperButton to="/">トップページへ</PaperButton> : null}
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
            maxHeight="calc(100vh - 56px)"
            overflowY="auto"
            top="calc(56px + 1rem)"
            right={0}
          >
            {sidebarContents}
            <Sidebar />
          </VStack>
        ) : null}
      </Flex>
    </>
  );
}

BasicLayout.defaultProps = {
  description: undefined,
  jumbotronHeight: undefined,
  sidebarContents: undefined,
  disableSidebar: false,
};

export default BasicLayout;
