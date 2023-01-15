import * as React from 'react';
import { Link as GatsbyLink, graphql, type PageProps, type HeadProps } from 'gatsby';
import { Flex, Heading, VStack } from '@chakra-ui/react';
import Seo from '../components/Seo';
import Jumbotron from '../components/Jumbotron';
import ArticleItem from '../components/ArticleItem';
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
    <>
      <Jumbotron height={240} title={`記事の一覧 (${currentPage}/${numPages})`} />
      <Flex py={4}>
        <VStack flexGrow={1} spacing={8} align="stretch" px={2}>
          <VStack spacing={2} align="stretch">
            <Heading as="h3" size="md">
              最新記事
            </Heading>
            {allMicrocmsBlogs.nodes.map(({ slug, publishedAt, ...node }) => (
              <ArticleItem key={slug} title={node.title} slug={slug} publishedAt={publishedAt} />
            ))}
          </VStack>
          <nav>
            {currentPage !== 1 ? (
              <div>
                <GatsbyLink to={currentPage === 2 ? `/posts/` : `/posts/${currentPage - 1}/`}>
                  {currentPage - 1}/{numPages}
                </GatsbyLink>
              </div>
            ) : null}
            {currentPage !== numPages ? (
              <div>
                <GatsbyLink to={`/posts/${currentPage + 1}/`}>
                  {currentPage + 1}/{numPages}
                </GatsbyLink>
              </div>
            ) : null}
          </nav>
        </VStack>
      </Flex>
    </>
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
