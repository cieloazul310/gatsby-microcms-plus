import useSiteMetadata from './useSiteMetadata';

function useBaseUrl() {
  const { siteUrl } = useSiteMetadata();
  const url = new URL(siteUrl);
  return url.origin;
}

export default useBaseUrl;
