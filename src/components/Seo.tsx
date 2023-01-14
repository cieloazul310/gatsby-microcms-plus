import * as React from 'react';
import useSiteMetadata from '../utils/useSiteMetadata';

type SeoProps = React.PropsWithChildren<{
  title?: string;
  description?: string;
}>;

function Seo({ title, description, children }: SeoProps) {
  const siteMetadata = useSiteMetadata();
  const pageTitle = title ? `${title} - ${siteMetadata.title}` : siteMetadata.title;
  const pageDescription = description ?? siteMetadata.description;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {children}
    </>
  );
}

Seo.defaultProps = {
  title: undefined,
  description: undefined,
};

export default Seo;
