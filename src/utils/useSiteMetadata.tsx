import { graphql, useStaticQuery } from 'gatsby';
import type { SiteMetadata } from '../../types';

type UseSiteMetadataQueryData = {
  site: {
    siteMetadata: SiteMetadata;
  };
};

function useSiteMetadata() {
  const { site } = useStaticQuery<UseSiteMetadataQueryData>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `);
  return site.siteMetadata;
}

export default useSiteMetadata;
