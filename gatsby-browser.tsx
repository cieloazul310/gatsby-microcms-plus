import * as React from 'react';
import type { WrapPageElementBrowserArgs } from 'gatsby';
import Layout from './src/layout';

export function wrapPageElement({ element }: WrapPageElementBrowserArgs) {
  return <Layout>{element}</Layout>;
}
