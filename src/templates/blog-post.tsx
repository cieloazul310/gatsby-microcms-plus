import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import { Heading, Text, Badge } from '@chakra-ui/react';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import Paper from '../components/Paper';
import Link from '../components/Link';
import Navigation from '../components/Navigation';
import useArticle from '../utils/useArticle';
import type { MicrocmsBlogs, MicrocmsBlogsCategory } from '../../types';

type BlogPostTemplateQueryData = {
  microcmsBlogs: Pick<MicrocmsBlogs, 'slug' | 'title' | 'publishedAt' | 'revisedAt' | 'content' | 'featuredImg' | 'excerpt'> & {
    category: Pick<MicrocmsBlogsCategory, 'id' | 'name'>;
  };
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
  const { title, publishedAt, revisedAt, content, category } = microcmsBlogs;
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
        {category ? (
          <Text mt={2}>
            <Link href={`/categories/${encodeURIComponent(category.id)}/`}>
              <Badge>{category.name}</Badge>
            </Link>
          </Text>
        ) : null}
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
  const imagePath = microcmsBlogs.featuredImg ? getSrc(microcmsBlogs.featuredImg) : undefined;
  return <Seo title={microcmsBlogs.title} description={description} image={imagePath} />;
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
      category {
        id
        name
      }
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
