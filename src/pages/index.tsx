import * as React from 'react';
import { Link as GatsbyLink, graphql, type PageProps } from 'gatsby';
import { Box, Flex, Heading } from '@chakra-ui/react';
import Seo from '../components/Seo';
import ArticleItem from '../components/ArticleItem';
import useSiteMetadata from '../utils/useSiteMetadata';
import type { MicroCMSHello, MicroCMSBlogs } from '../../types';

type IndexPageData = {
  microcmsHello: Pick<MicroCMSHello, 'text'>;
  allMicrocmsBlogs: {
    nodes: Pick<MicroCMSBlogs, 'slug' | 'title' | 'publishedAt'>[];
  };
};

function IndexPage({ data }: PageProps<IndexPageData>) {
  const { microcmsHello, allMicrocmsBlogs } = data;
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Box as="header" p={2}>
        <Flex
          rounded="xl"
          bgGradient="linear(to-r, blue.400, orange.100)"
          direction="column"
          justifyContent="center"
          gap={2}
          p={2}
          height={480}
        >
          <Heading as="h1" color="white">
            {title}
          </Heading>
          <Heading as="p" size="md" color="white">
            {description}
          </Heading>
        </Flex>
      </Box>
      <article>
        <p>{microcmsHello.text}</p>
      </article>
      <div>
        <h2>最新記事</h2>
        <div>
          {allMicrocmsBlogs.nodes.map(({ slug, publishedAt, ...node }) => (
            <ArticleItem key={slug} title={node.title} slug={slug} publishedAt={publishedAt} />
          ))}
        </div>
        <GatsbyLink to="/posts/">記事の一覧へ</GatsbyLink>
      </div>
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
