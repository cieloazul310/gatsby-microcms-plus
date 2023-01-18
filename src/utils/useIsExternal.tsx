function useIsExternal(href: string) {
  const internal = /^\/(?!\/)/.test(href);
  return !internal;
}

export default useIsExternal;
