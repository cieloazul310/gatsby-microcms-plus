import { withPrefix } from 'gatsby';
import useBaseUrl from './useBaseUrl';

function useAbsoluteUrl(path: string, options?: { prefix?: boolean }) {
  const baseUrl = useBaseUrl();
  const relativePath = options?.prefix ? withPrefix(path) : path;
  const url = new URL(relativePath, baseUrl);
  return url.toString();
}

export default useAbsoluteUrl;
