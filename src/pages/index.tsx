import * as React from 'react';
import { Link, graphql, type PageProps } from 'gatsby';
import Seo from '../components/Seo';
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
      <header>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <article>
        <p>{microcmsHello.text}</p>
      </article>
      <div>
        <h2>最新記事</h2>
        <ul>
          {allMicrocmsBlogs.nodes.map((node) => (
            <li key={node.slug}>
              <Link to={node.slug}>
                <p>{node.title}</p>
                <small>{node.publishedAt}</small>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/posts/">記事の一覧へ</Link>
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
