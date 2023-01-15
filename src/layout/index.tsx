import * as React from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = React.PropsWithChildren<{}>;

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>
        {children}
        <Footer />
      </main>
    </>
  );
}

export default Layout;
