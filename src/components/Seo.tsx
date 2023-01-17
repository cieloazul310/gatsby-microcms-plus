import * as React from 'react';
import useSiteMetadata from '../utils/useSiteMetadata';

type SeoProps = React.PropsWithChildren<{
  title?: string;
  description?: string;
  image?: string;
}>;

function Seo({ title, description, image, children }: SeoProps) {
  const siteMetadata = useSiteMetadata();
  const pageTitle = title ? `${title} - ${siteMetadata.title}` : siteMetadata.title;
  const pageDescription = description ?? siteMetadata.description;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="og:type" content="website" />
      <meta name="og:title" content={pageTitle} />
      <meta name="og:description" content={pageDescription} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={siteMetadata.title} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {image ? (
        <>
          <meta name="image" content={image} />
          <meta name="og:image" content={image} />
          <meta name="twitter:image" content={image} />
        </>
      ) : null}
      {children}
    </>
  );
}

Seo.defaultProps = {
  title: undefined,
  description: undefined,
  image: undefined,
};

export default Seo;
