import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import parseYYMM from './parseYYMM';

type UseAllMonthsQueryData = {
  allMicrocmsBlogs: {
    months: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
};

function useAllMonths() {
  const { allMicrocmsBlogs } = useStaticQuery<UseAllMonthsQueryData>(
    graphql`
      query {
        allMicrocmsBlogs {
          months: group(field: { yymm: SELECT }) {
            fieldValue
            totalCount
          }
        }
      }
    `
  );
  const { months } = allMicrocmsBlogs;

  return React.useMemo(
    () =>
      months
        .map(({ fieldValue, totalCount }) => {
          const { year, month } = parseYYMM(fieldValue);
          return { year, month, totalCount, path: `/${fieldValue}/` };
        })
        .sort((a, b) => b.year - a.year || b.month - a.month),
    [months]
  );
}

export default useAllMonths;
