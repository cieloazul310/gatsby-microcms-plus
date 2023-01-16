import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { VStack } from '@chakra-ui/react';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import ArticleItem from '../components/ArticleItem';
import Pagination from '../components/Pagination';
import type { MicroCMSBlogs, MicroCMSCategories } from '../../types';

type CategoriesTemplateData = {
  allMicrocmsBlogs: {
    nodes: Pick<MicroCMSBlogs, 'slug' | 'title' | 'publishedAt'>[];
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
    <BasicLayout jumbotronHeight={240} title={`${microcmsCategories.name} (${currentPage}/${numPages})`}>
      <VStack spacing={2} align="stretch">
        {allMicrocmsBlogs.nodes.map(({ slug, publishedAt, ...node }) => (
          <ArticleItem key={slug} title={node.title} slug={slug} publishedAt={publishedAt} />
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
        slug
        title
        publishedAt(formatString: "YYYY年MM月DD日")
      }
    }
    microcmsCategories(categoriesId: { eq: $fieldValue }) {
      name
    }
  }
`;
