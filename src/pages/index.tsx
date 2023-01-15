import * as React from 'react';
import { Link as GatsbyLink, graphql, type PageProps } from 'gatsby';
import { Box, Flex, VStack, Text, Heading } from '@chakra-ui/react';
import Seo from '../components/Seo';
import Jumbotron from '../components/Jumbotron';
import ArticleItem from '../components/ArticleItem';
import useAlpha from '../utils/useAlpha';
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
  const bg = useAlpha('primary.600', 0.08);
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Jumbotron title={title} description={description} />
      <Flex py={4}>
        <VStack flexGrow={1} spacing={8} align="stretch" px={2}>
          <Box as="article" rounded="xl" p={[4, 8]} bg={bg}>
            <Heading as="h3" size="md" mb={4}>
              最初のAPI
            </Heading>
            <Text>{microcmsHello.text}</Text>
            <Text color="gray.600">{microcmsHello.updatedAt} 更新</Text>
          </Box>
          <div>
            <Heading as="h3" size="md" mb={4}>
              最新記事
            </Heading>
            <VStack spacing={4} align="stretch">
              {allMicrocmsBlogs.nodes.map(({ slug, publishedAt, ...node }) => (
                <ArticleItem key={slug} title={node.title} slug={slug} publishedAt={publishedAt} />
              ))}
            </VStack>
            <GatsbyLink to="/posts/">記事の一覧へ</GatsbyLink>
          </div>
        </VStack>
        <VStack spacing={8} align="stretch" width={320} display={['none', 'none', 'block']}>
          <Box>aaa</Box>
        </VStack>
      </Flex>
    </>
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
        slug
        title
        publishedAt(formatString: "YYYY年MM月DD日")
      }
    }
  }
`;
