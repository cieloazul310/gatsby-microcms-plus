/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import { chakra, Heading, Text, OrderedList, UnorderedList, ListItem, Code, AspectRatio } from '@chakra-ui/react';
import Link from './Link';
import useAlpha from '../utils/useAlpha';

function Blockquote(props: Record<string, any>) {
  const bg = useAlpha('primary.600', 0.1);
  return <Text as="blockquote" my={4} bg={bg} px={[2, 2, 4]} py={8} rounded="xl" {...props} />;
}
function CodeBlock(props: Record<string, any>) {
  const bg = useAlpha('primary.600', 0.1);
  return <Code as="pre" overflowX="scroll" display="block" bg={bg} whiteSpace="pre" rounded="xl" {...props} p={[2, 2, 4]} py={8} my={4} />;
}

const ChakraImg = chakra('img');
const ChakraIframe = chakra('iframe');

const chakraComponents = {
  p: (props: Record<string, any>) => <Text my={4} {...props} />,
  h1: (props: Record<string, any>) => <Heading as="h1" mt={8} mb={4} size="xl" {...props} />,
  h2: (props: Record<string, any>) => (
    <Heading as="h2" mt={8} mb={4} size="lg" borderBottomWidth="1px" borderBottomColor="primary.400" {...props} />
  ),
  h3: (props: Record<string, any>) => <Heading as="h3" mt={8} mb={4} size="md" {...props} />,
  h4: (props: Record<string, any>) => <Heading as="h4" mt={8} mb={4} size="sm" {...props} />,
  h5: (props: Record<string, any>) => <Heading as="h5" mt={4} mb={4} size="sm" {...props} />,
  h6: (props: Record<string, any>) => <Heading as="h6" mt={4} mb={4} size="sm" {...props} />,
  ul: (props: Record<string, any>) => <UnorderedList my={4} {...props} />,
  ol: (props: Record<string, any>) => <OrderedList my={4} {...props} />,
  li: (props: Record<string, any>) => <ListItem {...props} />,
  blockquote: Blockquote,
  a: ({ href, ...props }: Record<string, any>) => <Link href={href} {...props} />,
  img: (props: Record<string, any>) => <ChakraImg my={4} {...props} />,
  iframe: ({ width, height, ...props }: Record<string, any>) => (
    <AspectRatio ratio={[1, 16 / 9]}>
      <ChakraIframe {...props} />
    </AspectRatio>
  ),
  code: (props: Record<string, any>) => <Code {...props} />,
  pre: CodeBlock,
};

export default chakraComponents;
