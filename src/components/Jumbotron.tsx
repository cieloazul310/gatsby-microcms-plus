import * as React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import useGradientBox from '../utils/useGradientBox';

type JumbotronProps = React.PropsWithChildren<{
  title?: string;
  description?: string;
  height?: number;
}>;

function Jumbotron({ title, description, children, height = 480 }: JumbotronProps) {
  const { color, bgGradient } = useGradientBox();
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" color={color} bgGradient={bgGradient} height={height} px={4}>
      {children || (
        <>
          <Heading as="h1" size="2xl" mb={2}>
            {title}
          </Heading>
          <Heading as="p" size="md" color="whiteAlpha.900">
            {description}
          </Heading>
        </>
      )}
    </Flex>
  );
}

Jumbotron.defaultProps = {
  title: undefined,
  description: undefined,
  height: 480,
};

export default Jumbotron;
