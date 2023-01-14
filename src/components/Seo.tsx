import * as React from 'react';
import useSiteMetadata from '../utils/useSiteMetadata';

type SeoProps = React.PropsWithChildren<{
  title?: string;
  description?: string;
}>;

function Seo(props: SeoProps) {
  const siteMetadata = useSiteMetadata();
  const title = props.title ? `${props.title} - ${siteMetadata.title}` : siteMetadata.title;
  const description = props.description ?? siteMetadata.description;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {props.children}
    </>
  );
}

export default Seo;
