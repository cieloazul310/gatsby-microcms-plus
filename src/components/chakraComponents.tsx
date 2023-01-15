/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import { Heading, Text, OrderedList, UnorderedList, ListItem } from '@chakra-ui/react';

const chakraComponents = {
  p: (props: Record<string, any>) => <Text my={4} {...props} />,
  h1: (props: Record<string, any>) => <Heading as="h1" mb={4} size="xl" {...props} />,
  h2: (props: Record<string, any>) => <Heading as="h2" mb={4} size="lg" {...props} />,
  h3: (props: Record<string, any>) => <Heading as="h3" mb={4} size="md" {...props} />,
  h4: (props: Record<string, any>) => <Heading as="h4" mb={4} size="sm" {...props} />,
  h5: (props: Record<string, any>) => <Heading as="h5" mb={4} size="sm" {...props} />,
  h6: (props: Record<string, any>) => <Heading as="h6" mb={4} size="sm" {...props} />,
  ul: (props: Record<string, any>) => <UnorderedList my={4} {...props} />,
  ol: (props: Record<string, any>) => <OrderedList my={4} {...props} />,
  li: (props: Record<string, any>) => <ListItem {...props} />,
};

export default chakraComponents;
