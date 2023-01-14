import * as React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = React.PropsWithChildren<{}>;

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Flex>
        <Box as="main" flexGrow={1}>
          {children}
          <Footer />
        </Box>
      </Flex>
    </>
  );
}

export default Layout;
