import * as React from 'react';
import { Link, graphql, type PageProps, type HeadProps } from 'gatsby';
import { Box, Flex, VStack } from '@chakra-ui/react';
import Seo from '../components/Seo';
import Jumbotron from '../components/Jumbotron';
import Paper from '../components/Paper';
import useArticle from '../utils/useArticle';
import type { MicroCMSBlogs } from '../../types';

type BlogPostTemplateQueryData = {
  microcmsBlogs: Pick<MicroCMSBlogs, 'slug' | 'title' | 'publishedAt' | 'content'>;
  newer: Pick<MicroCMSBlogs, 'slug' | 'title' | 'publishedAt'> | null;
  older: Pick<MicroCMSBlogs, 'slug' | 'title' | 'publishedAt'> | null;
};

type BlogPostTemplatePageContext = {
  slug: string;
  newer: string | null;
  older: string | null;
};

function BlogsTemplate({ data }: PageProps<BlogPostTemplateQueryData, BlogPostTemplatePageContext>) {
  const { microcmsBlogs, newer, older } = data;
  const { title, publishedAt, content } = microcmsBlogs;
  const body = useArticle(content);
  return (
    <>
      <Jumbotron title={title} description={publishedAt} />
      <Flex py={4}>
        <VStack flexGrow={1} spacing={8} align="stretch" px={2}>
          <Paper as="article">{body}</Paper>
          <nav>
            <div>
              {newer ? (
                <div>
                  <p>新しい記事</p>
                  <Link to={newer.slug}>{newer.title}</Link>
                  <small>{newer.publishedAt}</small>
                </div>
              ) : null}
              {older ? (
                <div>
                  <p>古い記事</p>
                  <Link to={older.slug}>{older.title}</Link>
                  <small>{older.publishedAt}</small>
                </div>
              ) : null}
            </div>
          </nav>
        </VStack>
        <VStack spacing={8} align="stretch" width="320px" display={['none', 'none', 'block']}>
          <Box>aaa</Box>
        </VStack>
      </Flex>
    </>
  );
}

export default BlogsTemplate;

export function Head({ data }: HeadProps<BlogPostTemplateQueryData, BlogPostTemplatePageContext>) {
  const { microcmsBlogs } = data;
  return <Seo title={microcmsBlogs.title} />;
}

export const query = graphql`
  query BlogPostPageQuery($slug: String!, $newer: String, $older: String) {
    microcmsBlogs(slug: { eq: $slug }) {
      slug
      title
      publishedAt(formatString: "YYYY年MM月DD日")
      content
    }
    newer: microcmsBlogs(slug: { eq: $newer }) {
      slug
      title
      publishedAt(formatString: "YYYY年MM月DD日")
    }
    older: microcmsBlogs(slug: { eq: $older }) {
      slug
      title
      publishedAt(formatString: "YYYY年MM月DD日")
    }
  }
`;
