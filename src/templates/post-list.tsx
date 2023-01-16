import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { VStack } from '@chakra-ui/react';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import Paper from '../components/Paper';
import ArticleItem from '../components/ArticleItem';
import Pagination from '../components/Pagination';
import type { MicroCMSBlogs } from '../../types';

type PostListTemplateData = {
  allMicrocmsBlogs: {
    nodes: Pick<MicroCMSBlogs, 'slug' | 'title' | 'publishedAt'>[];
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
    <BasicLayout
      jumbotronHeight={240}
      title={`記事の一覧 (${currentPage}/${numPages})`}
      sidebarContents={<Paper bgSchema="secondary">aaa</Paper>}
    >
      <VStack spacing={2} align="stretch">
        {allMicrocmsBlogs.nodes.map(({ slug, publishedAt, ...node }) => (
          <ArticleItem key={slug} title={node.title} slug={slug} publishedAt={publishedAt} />
        ))}
      </VStack>
      <Pagination currentPage={currentPage} numPages={numPages} basePath="/posts/" />
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
        slug
        title
        publishedAt(formatString: "YYYY年MM月DD日")
      }
    }
  }
`;
