import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import Paper from '../components/Paper';
import Navigation from '../components/Navigation';
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
    <BasicLayout title={title} description={publishedAt} sidebarContents={<Paper bgSchema="secondary">aaa</Paper>}>
      <Paper as="article">{body}</Paper>
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
