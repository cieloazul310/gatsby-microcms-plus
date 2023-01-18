/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import { Link as GatsbyLink, type GatsbyLinkProps } from 'gatsby';
import { Button, type ButtonProps, Link as ChakraLink, type LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import useAlpha from '../utils/useAlpha';
import useIsExternal from '../utils/useIsExternal';

type PaperButtonProps<TState = Record<string, unknown>> = {
  bgSchema?: string;
  href: string;
} & ButtonProps &
  Omit<GatsbyLinkProps<TState>, 'ref' | 'to'> &
  ChakraLinkProps;

function PaperButton<TState = Record<string, unknown>>({ bgSchema = 'primary', href, children, ...props }: PaperButtonProps<TState>) {
  const bg = useAlpha(`${bgSchema}.600`, 0.08);
  const hovered = useAlpha(`${bgSchema}.600`, 0.16);
  const isExternal = useIsExternal(href);

  if (!isExternal) {
    return (
      <Button as={GatsbyLink<TState>} rounded="xl" p={[4, 8]} minHeight="48px" bg={bg} to={href} _hover={{ bg: hovered }} {...props}>
        {children}
      </Button>
    );
  }
  return (
    <Button
      as={ChakraLink}
      rounded="xl"
      p={[4, 8]}
      minHeight="48px"
      bg={bg}
      href={href}
      isExternal
      _hover={{ bg: hovered, textDecoration: 'none' }}
      {...props}
    >
      {children}
      <ExternalLinkIcon mx="2px" />
    </Button>
  );
}

PaperButton.defaultProps = {
  bgSchema: 'primary',
};

export default PaperButton;
