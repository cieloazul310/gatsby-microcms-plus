/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';
import useAlpha from '../utils/useAlpha';

type PaperProps = {
  bgSchema?: string;
  hover?: boolean;
} & BoxProps;

function Paper({ bgSchema = 'primary', hover = false, ...props }: PaperProps) {
  const bg = useAlpha(`${bgSchema}.600`, 0.08);
  const hovered = useAlpha(`${bgSchema}.600`, 0.16);

  return <Box rounded="xl" p={[4, 8]} bg={bg} transition="background .25s" _hover={hover ? { bg: hovered } : undefined} {...props} />;
}

Paper.defaultProps = {
  bgSchema: 'primary',
  hover: false,
};

export default Paper;
