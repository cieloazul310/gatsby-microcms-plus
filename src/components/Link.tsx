/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import { Link as GatsbyLink, type GatsbyLinkProps } from 'gatsby';
import { useColorMode, Link as ChakraLink, type LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type LinkProps<TState = Record<string, unknown>> = Omit<GatsbyLinkProps<TState>, 'to'> &
  Omit<ChakraLinkProps, 'href'> &
  Required<Pick<ChakraLinkProps, 'href'>> & {
    colorScheme?: string;
  };

function Link<TState = Record<string, unknown>>({ href, colorScheme = 'primary', children, ...props }: LinkProps) {
  const { colorMode } = useColorMode();
  const internal = /^\/(?!\/)/.test(href);
  const color = props.color ?? (colorMode === 'light' ? `${colorScheme}.700` : `${colorScheme}.200`);

  if (internal) {
    return (
      <ChakraLink as={GatsbyLink<TState>} color={color} {...props} to={href}>
        {children}
      </ChakraLink>
    );
  }
  return (
    <ChakraLink href={href} isExternal color={color} {...props}>
      {children}
      <ExternalLinkIcon mx="2px" />
    </ChakraLink>
  );
}

Link.defaultProps = {
  colorScheme: 'primary',
};

export default Link;
