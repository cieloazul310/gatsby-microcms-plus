import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import ArticleList from '../components/ArticleList';
import Pagination from '../components/Pagination';
import Navigation from '../components/Navigation';
import parseYYMM from '../utils/parseYYMM';
import type { MicrocmsBlogsList } from '../../types';

type MonthTemplateData = {
  allMicrocmsBlogs: {
    nodes: MicrocmsBlogsList[];
  };
};

type MonthTemplatePageContext = {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
  fieldValue: string;
  older: {
    slug: string;
    label: string;
  } | null;
  newer: {
    slug: string;
    label: string;
  } | null;
};

function MonthTemplate({ data, pageContext }: PageProps<MonthTemplateData, MonthTemplatePageContext>) {
  const { allMicrocmsBlogs } = data;
  const { numPages, currentPage, fieldValue, newer, older } = pageContext;
  const { year, month } = parseYYMM(fieldValue);
  return (
    <BasicLayout jumbotronHeight={240} title={`${year}年${month}月の記事`}>
      <ArticleList items={allMicrocmsBlogs.nodes} />
      {numPages !== 1 ? <Pagination currentPage={currentPage} numPages={numPages} basePath={`/${fieldValue}/`} /> : null}
      <Navigation left={newer} right={older} />
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
        ...MicrocmsBlogsList
      }
    }
  }
`;
