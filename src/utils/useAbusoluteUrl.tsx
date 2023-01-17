import { withPrefix } from 'gatsby';
import useBaseUrl from './useBaseUrl';

function useAbsoluteUrl(path: string) {
  const baseUrl = useBaseUrl();
  const url = new URL(withPrefix(path), baseUrl);
  return url.toString();
}

export default useAbsoluteUrl;
