import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import { Text, Heading } from '@chakra-ui/react';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import Paper from '../components/Paper';
import ArticleList from '../components/ArticleList';
import useSiteMetadata from '../utils/useSiteMetadata';
import type { MicrocmsHello, MicrocmsBlogsList } from '../../types';

type IndexPageData = {
  microcmsHello: Pick<MicrocmsHello, 'text' | 'revisedAt'>;
  allMicrocmsBlogs: {
    nodes: MicrocmsBlogsList[];
  };
};

function IndexPage({ data }: PageProps<IndexPageData>) {
  const { microcmsHello, allMicrocmsBlogs } = data;
  const { title, description } = useSiteMetadata();

  return (
    <BasicLayout title={title} description={description}>
      <Paper as="article">
        <Heading as="h2" size="md" mb={4}>
          最初のAPI
        </Heading>
        <Text>{microcmsHello.text}</Text>
        <Text as="footer">
          <time>{microcmsHello.revisedAt}</time> 更新
        </Text>
      </Paper>
      <ArticleList title="最新記事" items={allMicrocmsBlogs.nodes} bottomButton={{ title: '記事の一覧へ', path: '/posts/' }} />
    </BasicLayout>
  );
}

export default IndexPage;

export function Head() {
  return <Seo />;
}

export const query = graphql`
  {
    microcmsHello {
      text
      revisedAt(formatString: "YYYY年MM月DD日")
    }
    allMicrocmsBlogs(sort: { publishedAt: DESC }, limit: 8) {
      nodes {
        ...MicrocmsBlogsList
      }
    }
  }
`;
