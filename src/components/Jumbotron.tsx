/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import { Box, Container, Heading, type BoxProps } from '@chakra-ui/react';
import useGradientBox from '../utils/useGradientBox';

type JumbotronProps = BoxProps & {
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
  height = ['calc(100vh - var(--chakra-sizes-header))', 480],
  px = 4,
  pb = ['var(--chakra-sizes-header)', 0],
  ...props
}: JumbotronProps) {
  const { color, bgGradient } = useGradientBox();
  return (
    <Box as={as} bgGradient={props.bgGradient ?? bgGradient} height={height} px={px} {...props}>
      <Container
        display="flex"
        flexDirection={flexDirection}
        alignItems={alignItems}
        justifyContent={justifyContent}
        color={props.color ?? color}
        height={height}
        maxWidth="container.xl"
        pb={pb}
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
      </Container>
    </Box>
  );
}

Jumbotron.defaultProps = {
  title: undefined,
  description: undefined,
};

export default Jumbotron;
