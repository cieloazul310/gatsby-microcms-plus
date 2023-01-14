import * as React from 'react';
import { Link } from 'gatsby';
import useSiteMetadata from '../utils/useSiteMetadata';

import './layout.css';

type LayoutProps = React.PropsWithChildren<{

}>;

function Layout({ children }: LayoutProps) {
  const { title, author } = useSiteMetadata();
  return (
    <div className="content">
      <header className="header">
        <Link to="/">{title}</Link>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {author} All rights reserved. Built with
          {` `}
          <a href="https://www.gatsbyjs.com/" target="_blank" rel="noopener noreferrer">
            Gatsby
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Layout;
