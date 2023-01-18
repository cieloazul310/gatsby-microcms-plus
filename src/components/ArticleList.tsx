/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import ArticleItem from './ArticleItem';
import PaperButton from './PaperButton';
import type { MicrocmsBlogsList } from '../../types';

type ArticleListProps = {
  items: MicrocmsBlogsList[];
  title?: React.ReactNode;
  bottomButton?: {
    title: string;
    path: string;
  };
};

function ArticleList({ items, bottomButton, ...props }: ArticleListProps) {
  return (
    <VStack as="nav" spacing={2} align="stretch">
      {props.title ? (
        <Heading as="h3" size="md">
          {props.title}
        </Heading>
      ) : null}
      {items.map((node) => (
        <ArticleItem key={node.slug} {...node} />
      ))}
      {bottomButton ? <PaperButton to={bottomButton.path}>{bottomButton.title}</PaperButton> : null}
    </VStack>
  );
}

ArticleList.defaultProps = {
  title: undefined,
  bottomButton: undefined,
};

export default ArticleList;
