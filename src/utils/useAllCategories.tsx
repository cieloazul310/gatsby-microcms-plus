import { graphql, useStaticQuery } from 'gatsby';
import type { MicroCMSCategories } from '../../types';

type UseAllCatgoriesQueryData = {
  allMicrocmsCategories: {
    nodes: Pick<MicroCMSCategories, 'name' | 'categoriesId'>[];
  };
};

function useAllCategories() {
  const { allMicrocmsCategories } = useStaticQuery<UseAllCatgoriesQueryData>(
    graphql`
      query {
        allMicrocmsCategories(sort: { sortIndex: ASC }) {
          nodes {
            name
            categoriesId
          }
        }
      }
    `
  );

  return allMicrocmsCategories.nodes;
}

export default useAllCategories;
