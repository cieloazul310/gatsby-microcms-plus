import * as React from 'react';
import useAllCategories from './useAllCategories';
import useAllMonths from './useAllMonths';

function useMenu() {
  const categories = useAllCategories();
  const months = useAllMonths();

  return React.useMemo(
    () => [
      {
        name: 'Categories',
        items: categories.map(({ name, categoriesId }) => ({ name, path: `/categories/${encodeURIComponent(categoriesId)}/` })),
      },
      {
        name: 'Archive',
        items: months.map(({ year, month, path }) => ({ name: `${year}年${month}月`, path })),
      },
      {
        name: 'Link',
        items: [
          { name: 'Gatsby', path: 'https://www.gatsbyjs.com/' },
          { name: 'microCMS', path: 'https://microcms.io/' },
          { name: 'Chakra UI', path: 'https://chakra-ui.com/' },
          { name: 'GitHub', path: 'https://github.com/cieloazul310/gatsby-microcms-plus' },
        ],
      },
    ],
    [categories, months]
  );
}

export default useMenu;
