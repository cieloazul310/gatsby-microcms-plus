import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import { Heading, Text } from '@chakra-ui/react';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import Paper from '../components/Paper';
import Navigation from '../components/Navigation';
import useArticle from '../utils/useArticle';
import type { MicrocmsBlogs } from '../../types';

type BlogPostTemplateQueryData = {
  microcmsBlogs: Pick<MicrocmsBlogs, 'slug' | 'title' | 'publishedAt' | 'revisedAt' | 'content' | 'featuredImg' | 'excerpt'>;
  newer: Pick<MicrocmsBlogs, 'slug' | 'title' | 'publishedAt'> | null;
  older: Pick<MicrocmsBlogs, 'slug' | 'title' | 'publishedAt'> | null;
};

type BlogPostTemplatePageContext = {
  slug: string;
  newer: string | null;
  older: string | null;
};

function BlogsTemplate({ data }: PageProps<BlogPostTemplateQueryData, BlogPostTemplatePageContext>) {
  const { microcmsBlogs, newer, older } = data;
  const { title, publishedAt, revisedAt, content } = microcmsBlogs;
  const body = useArticle(content);
  return (
    <BasicLayout title={title} description={publishedAt}>
      <Paper as="article">{body}</Paper>
      <Paper as="footer">
        <Heading as="h1" size="sm" mb={2}>
          {title}
        </Heading>
        <Text>公開日: {publishedAt}</Text>
        <Text>最終更新日: {revisedAt}</Text>
      </Paper>
      <Navigation
        left={newer ? { slug: newer.slug, label: newer.title } : null}
        right={older ? { slug: older.slug, label: older.title } : null}
      />
    </BasicLayout>
  );
}

export default BlogsTemplate;

export function Head({ data }: HeadProps<BlogPostTemplateQueryData, BlogPostTemplatePageContext>) {
  const { microcmsBlogs } = data;
  const description = microcmsBlogs.excerpt;
  const imageUrl = microcmsBlogs.featuredImg ? getSrc(microcmsBlogs.featuredImg) : undefined;
  return <Seo title={microcmsBlogs.title} description={description} image={imageUrl} />;
}

export const query = graphql`
  query BlogPostPageQuery($slug: String!, $newer: String, $older: String) {
    microcmsBlogs(slug: { eq: $slug }) {
      slug
      title
      publishedAt(formatString: "YYYY年MM月DD日")
      revisedAt(formatString: "YYYY年MM月DD日")
      content
      excerpt
      featuredImg {
        childImageSharp {
          gatsbyImageData
        }
      }
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
