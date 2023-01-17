import * as React from 'react';
import { VStack } from '@chakra-ui/react';
import PaperButton from '../components/PaperButton';
import useAllCategories from '../utils/useAllCategories';
import useAllMonths from '../utils/useAllMonths';

function Sidebar() {
  const categories = useAllCategories();
  const months = useAllMonths();
  return (
    <>
      <VStack spacing={2} as="nav">
        {categories.map(({ name, categoriesId }) => (
          <PaperButton key={categoriesId} to={`/categories/${categoriesId}/`} width="100%">
            {name}
          </PaperButton>
        ))}
      </VStack>
      <VStack spacing={2} as="nav">
        {months.map(({ year, month, path }) => (
          <PaperButton key={path} to={path} width="100%">
            {year}年{month}月
          </PaperButton>
        ))}
      </VStack>
    </>
  );
}

export default Sidebar;
