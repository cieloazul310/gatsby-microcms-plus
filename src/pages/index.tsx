import * as React from 'react';
import { Link as GatsbyLink, graphql, type PageProps } from 'gatsby';
import { VStack, Text, Heading } from '@chakra-ui/react';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import Paper from '../components/Paper';
// import Jumbotron from '../components/Jumbotron';
import ArticleItem from '../components/ArticleItem';
import useSiteMetadata from '../utils/useSiteMetadata';
import type { MicroCMSHello, MicroCMSBlogs } from '../../types';

type IndexPageData = {
  microcmsHello: Pick<MicroCMSHello, 'text' | 'updatedAt'>;
  allMicrocmsBlogs: {
    nodes: Pick<MicroCMSBlogs, 'slug' | 'title' | 'publishedAt'>[];
  };
};

function IndexPage({ data }: PageProps<IndexPageData>) {
  const { microcmsHello, allMicrocmsBlogs } = data;
  const { title, description } = useSiteMetadata();

  return (
    <BasicLayout title={title} description={description} sidebarContents={<Paper bgSchema="secondary">aaa</Paper>}>
      <Paper as="article">
        <Heading as="h3" size="md" mb={4}>
          最初のAPI
        </Heading>
        <Text>{microcmsHello.text}</Text>
        <Text color="gray.600">{microcmsHello.updatedAt} 更新</Text>
      </Paper>
      <div>
        <VStack spacing={2} align="stretch">
          <Heading as="h3" size="md">
            最新記事
          </Heading>
          {allMicrocmsBlogs.nodes.map(({ slug, publishedAt, ...node }) => (
            <ArticleItem key={slug} title={node.title} slug={slug} publishedAt={publishedAt} />
          ))}
          <GatsbyLink to="/posts/">記事の一覧へ</GatsbyLink>
        </VStack>
      </div>
    </BasicLayout>
  );
  /*
  return (
    <>
      <Jumbotron title={title} description={description} />
      <Flex py={4} px={2}>
        <VStack flexGrow={1} spacing={8} align="stretch" px={2} maxWidth="100%">
          <Paper as="article">
            <Heading as="h3" size="md" mb={4}>
              最初のAPI
            </Heading>
            <Text>{microcmsHello.text}</Text>
            <Text color="gray.600">{microcmsHello.updatedAt} 更新</Text>
          </Paper>
          <div>
            <VStack spacing={2} align="stretch">
              <Heading as="h3" size="md">
                最新記事
              </Heading>
              {allMicrocmsBlogs.nodes.map(({ slug, publishedAt, ...node }) => (
                <ArticleItem key={slug} title={node.title} slug={slug} publishedAt={publishedAt} />
              ))}
              <GatsbyLink to="/posts/">記事の一覧へ</GatsbyLink>
            </VStack>
          </div>
        </VStack>
        <VStack spacing={8} align="stretch" width="320px" display={['none', 'none', 'block']} px={2} flexShrink={0}>
          <Paper bgSchema="secondary">aaa</Paper>
        </VStack>
      </Flex>
    </>
  );
  */
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
        slug
        title
        publishedAt(formatString: "YYYY年MM月DD日")
      }
    }
  }
`;
