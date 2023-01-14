import * as React from 'react';
import type { WrapPageElementNodeArgs } from 'gatsby';
import Layout from './src/layout';

export function wrapPageElement({ element }: WrapPageElementNodeArgs) {
  return <Layout>{element}</Layout>;
}
