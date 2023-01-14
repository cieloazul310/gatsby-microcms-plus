import * as React from 'react';
import { Link, graphql, type PageProps, type HeadProps } from 'gatsby';
import Seo from '..//components/Seo';
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
  return (
    <>
      <article>
        <h1>{title}</h1>
        <p>{publishedAt}</p>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </article>
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
