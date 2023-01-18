import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import { Text, Heading } from '@chakra-ui/react';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import Paper from '../components/Paper';
import ArticleList from '../components/ArticleList';
import useSiteMetadata from '../utils/useSiteMetadata';
import type { MicroCMSHello, MicroCMSBlogsList } from '../../types';

type IndexPageData = {
  microcmsHello: Pick<MicroCMSHello, 'text' | 'updatedAt'>;
  allMicrocmsBlogs: {
    nodes: MicroCMSBlogsList[];
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
          <time>{microcmsHello.updatedAt}</time> 更新
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
      updatedAt(formatString: "YYYY年MM月DD日")
    }
    allMicrocmsBlogs(sort: { publishedAt: DESC }, limit: 8) {
      nodes {
        ...MicrocmsBlogsList
      }
    }
  }
`;
