/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import { Link as GatsbyLink, type GatsbyLinkProps } from 'gatsby';
import { Link as ChakraLink, type LinkProps as ChakraLinkProps } from '@chakra-ui/react';

type LinkProps<TState = Record<string, unknown>> = Omit<GatsbyLinkProps<TState>, 'to'> &
  Omit<ChakraLinkProps, 'href'> &
  Required<Pick<ChakraLinkProps, 'href'>>;

function Link<TState = Record<string, unknown>>({ href, ...props }: LinkProps) {
  const internal = /^\/(?!\/)/.test(href);
  if (internal) {
    return <ChakraLink as={GatsbyLink<TState>} {...props} to={href} />;
  }
  return <ChakraLink href={href} isExternal {...props} />;
}

export default Link;
