/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import { Link as GatsbyLink, type GatsbyLinkProps } from 'gatsby';
import { Button, type ButtonProps } from '@chakra-ui/react';
import useAlpha from '../utils/useAlpha';

type PaperButtonProps<TState = Record<string, unknown>> = {
  bgSchema?: string;
  hover?: boolean;
} & ButtonProps &
  Omit<GatsbyLinkProps<TState>, 'ref'>;

function PaperButton<TState = Record<string, unknown>>({ bgSchema = 'primary', hover = false, to, ...props }: PaperButtonProps<TState>) {
  const bg = useAlpha(`${bgSchema}.600`, 0.08);
  const hovered = useAlpha(`${bgSchema}.600`, 0.16);

  return (
    <Button
      as={GatsbyLink<TState>}
      rounded="xl"
      p={[4, 8]}
      minHeight="48px"
      bg={bg}
      to={to}
      _hover={hover ? { bg: hovered } : undefined}
      {...props}
    />
  );
}

PaperButton.defaultProps = {
  bgSchema: 'primary',
  hover: false,
};

export default PaperButton;
