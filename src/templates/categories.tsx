import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { VStack } from '@chakra-ui/react';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import Paper from '../components/Paper';
import ArticleItem from '../components/ArticleItem';
import Pagination from '../components/Pagination';
import type { MicroCMSBlogsList, MicroCMSCategories } from '../../types';

type CategoriesTemplateData = {
  allMicrocmsBlogs: {
    nodes: MicroCMSBlogsList[];
  };
  microcmsCategories: Pick<MicroCMSCategories, 'name'>;
};

type CategoriesTemplatePageContext = {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
  fieldValue: string;
};

function CategoriesTemplate({ data, pageContext }: PageProps<CategoriesTemplateData, CategoriesTemplatePageContext>) {
  const { allMicrocmsBlogs, microcmsCategories } = data;
  const { numPages, currentPage, fieldValue } = pageContext;
  return (
    <BasicLayout jumbotronHeight={240} title={microcmsCategories.name}>
      <VStack spacing={2} align="stretch">
        {allMicrocmsBlogs.nodes.length === 0 ? <Paper>このカテゴリーは記事がありません。</Paper> : null}
        {allMicrocmsBlogs.nodes.map(({ slug, publishedAt, featuredImg, ...node }) => (
          <ArticleItem key={slug} title={node.title} slug={slug} publishedAt={publishedAt} featuredImg={featuredImg} />
        ))}
      </VStack>
      {numPages !== 1 ? <Pagination currentPage={currentPage} numPages={numPages} basePath={`/categories/${fieldValue}/`} /> : null}
    </BasicLayout>
  );
}

export default CategoriesTemplate;

export function Head({ data, pageContext }: HeadProps<CategoriesTemplateData, CategoriesTemplatePageContext>) {
  const { microcmsCategories } = data;
  const { numPages, currentPage } = pageContext;
  const title = `${microcmsCategories.name} (${currentPage}/${numPages})`;
  return <Seo title={title} />;
}

export const query = graphql`
  query CategoryPostList($skip: Int!, $limit: Int!, $fieldValue: String!) {
    allMicrocmsBlogs(filter: { category: { id: { eq: $fieldValue } } }, sort: { publishedAt: DESC }, limit: $limit, skip: $skip) {
      nodes {
        ...MicrocmsBlogsList
      }
    }
    microcmsCategories(categoriesId: { eq: $fieldValue }) {
      name
    }
  }
`;
