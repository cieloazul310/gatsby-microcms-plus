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
        items: categories.map(({ name, categoriesId }) => ({ name, path: `/categories/${categoriesId}/` })),
      },
      {
        name: 'Archive',
        items: months.map(({ year, month, path }) => ({ name: `${year}年${month}月`, path })),
      },
    ],
    [categories, months]
  );
}

export default useMenu;