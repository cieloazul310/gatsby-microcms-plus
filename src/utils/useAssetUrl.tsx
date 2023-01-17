import useAbsoluteUrl from './useAbusoluteUrl';

function useAssetUrl(assetPath: string | undefined | null) {
  if (!assetPath) return undefined;
  const assetUrl = useAbsoluteUrl(assetPath);
  return assetUrl;
}

export default useAssetUrl;
