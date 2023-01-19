import * as React from 'react';
import useSiteMetadata from '../utils/useSiteMetadata';
import useAssetUrl from '../utils/useAssetUrl';

type SeoProps = React.PropsWithChildren<{
  title?: string;
  description?: string;
  image?: string;
}>;

function Seo({ title, description, image, children }: SeoProps) {
  const siteMetadata = useSiteMetadata();
  const pageTitle = title ? `${title} - ${siteMetadata.title}` : siteMetadata.title;
  const pageDescription = description ?? siteMetadata.description;
  const imageUrl = useAssetUrl(image);

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
      {imageUrl ? (
        <>
          <meta name="image" content={imageUrl} />
          <meta name="og:image" content={imageUrl} />
          <meta name="twitter:image" content={imageUrl} />
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
