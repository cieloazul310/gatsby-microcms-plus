import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import ArticleList from '../components/ArticleList';
import Pagination from '../components/Pagination';
import type { MicrocmsBlogsList } from '../../types';

type PostListTemplateData = {
  allMicrocmsBlogs: {
    nodes: MicrocmsBlogsList[];
  };
};

type PostListTemplatePageContext = {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
};

function PostListTemplate({ data, pageContext }: PageProps<PostListTemplateData, PostListTemplatePageContext>) {
  const { allMicrocmsBlogs } = data;
  const { numPages, currentPage } = pageContext;
  return (
    <BasicLayout jumbotronHeight={240} title={`記事の一覧 (${currentPage}/${numPages})`}>
      <ArticleList items={allMicrocmsBlogs.nodes} />
      {numPages !== 1 ? <Pagination currentPage={currentPage} numPages={numPages} basePath="/posts/" /> : null}
    </BasicLayout>
  );
}

export default PostListTemplate;

export function Head({ pageContext }: HeadProps<PostListTemplateData, PostListTemplatePageContext>) {
  const { numPages, currentPage } = pageContext;
  const title = `記事一覧 (${currentPage}/${numPages})`;
  return <Seo title={title} />;
}

export const query = graphql`
  query PostList($skip: Int!, $limit: Int!) {
    allMicrocmsBlogs(sort: { publishedAt: DESC }, limit: $limit, skip: $skip) {
      nodes {
        ...MicrocmsBlogsList
      }
    }
  }
`;
