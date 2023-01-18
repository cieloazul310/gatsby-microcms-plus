/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import { Flex, Heading, type FlexProps } from '@chakra-ui/react';
import useGradientBox from '../utils/useGradientBox';

type JumbotronProps = FlexProps & {
  title?: string;
  description?: string;
};

function Jumbotron({
  title,
  description,
  children,
  as = 'header',
  flexDirection = 'column',
  alignItems = 'center',
  justifyContent = 'center',
  height = ['calc(100vh - 56px)', 480],
  px = 4,
  ...props
}: JumbotronProps) {
  const { color, bgGradient } = useGradientBox();
  return (
    <Flex
      as={as}
      direction={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
      color={props.color ?? color}
      bgGradient={props.bgGradient ?? bgGradient}
      height={height}
      px={px}
      {...props}
    >
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
  // height: 480,
};

export default Jumbotron;
