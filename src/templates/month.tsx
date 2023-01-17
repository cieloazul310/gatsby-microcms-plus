import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { VStack } from '@chakra-ui/react';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import ArticleItem from '../components/ArticleItem';
import Pagination from '../components/Pagination';
import type { MicroCMSBlogs } from '../../types';

function parseYYMM(yymm: string) {
  const [year, month] = yymm.split('/');
  return { year, month: parseInt(month, 10) };
}

type MonthTemplateData = {
  allMicrocmsBlogs: {
    nodes: Pick<MicroCMSBlogs, 'slug' | 'title' | 'publishedAt' | 'featuredImg'>[];
  };
};

type MonthTemplatePageContext = {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
  fieldValue: string;
};

function MonthTemplate({ data, pageContext }: PageProps<MonthTemplateData, MonthTemplatePageContext>) {
  const { allMicrocmsBlogs } = data;
  const { numPages, currentPage, fieldValue } = pageContext;
  const { year, month } = parseYYMM(fieldValue);
  return (
    <BasicLayout jumbotronHeight={240} title={`${year}年${month}月の記事`}>
      <VStack spacing={2} align="stretch">
        {allMicrocmsBlogs.nodes.map(({ slug, publishedAt, featuredImg, ...node }) => (
          <ArticleItem key={slug} title={node.title} slug={slug} publishedAt={publishedAt} featuredImg={featuredImg} />
        ))}
      </VStack>
      {numPages !== 1 ? <Pagination currentPage={currentPage} numPages={numPages} basePath={`/${fieldValue}/`} /> : null}
    </BasicLayout>
  );
}

export default MonthTemplate;

export function Head({ pageContext }: HeadProps<MonthTemplateData, MonthTemplatePageContext>) {
  const { numPages, currentPage, fieldValue } = pageContext;
  const { year, month } = parseYYMM(fieldValue);
  const title = `${year}年${month}月の記事 (${currentPage}/${numPages})`;
  return <Seo title={title} />;
}

export const query = graphql`
  query MonthPostList($skip: Int!, $limit: Int!, $fieldValue: String!) {
    allMicrocmsBlogs(filter: { yymm: { eq: $fieldValue } }, sort: { publishedAt: DESC }, limit: $limit, skip: $skip) {
      nodes {
        slug
        title
        publishedAt(formatString: "YYYY年MM月DD日")
        featuredImg {
          childImageSharp {
            gatsbyImageData(width: 320)
          }
        }
      }
    }
  }
`;
