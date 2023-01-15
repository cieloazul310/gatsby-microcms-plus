/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';
import useAlpha from '../utils/useAlpha';

type PaperProps = {
  bgSchema?: string;
} & BoxProps;

function Paper({ bgSchema = 'primary', ...props }: PaperProps) {
  const bg = useAlpha(`${bgSchema}.600`, 0.08);
  return <Box rounded="xl" p={[4, 8]} bg={bg} {...props} />;
}

Paper.defaultProps = {
  bgSchema: 'primary',
};

export default Paper;
