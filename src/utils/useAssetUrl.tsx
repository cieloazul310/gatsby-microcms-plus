import useAbsoluteUrl from './useAbusoluteUrl';

function useAssetUrl(assetPath: string | undefined | null, options?: { prefix?: boolean }) {
  if (!assetPath) return undefined;
  const assetUrl = useAbsoluteUrl(assetPath, options);
  return assetUrl;
}

export default useAssetUrl;
