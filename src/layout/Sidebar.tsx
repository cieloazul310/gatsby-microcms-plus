import * as React from 'react';
import { VStack } from '@chakra-ui/react';
import Paper from '../components/Paper';
import PaperButton from '../components/PaperButton';
import useAllCategories from '../utils/useAllCategories';

function Sidebar() {
  const categories = useAllCategories();
  return (
    <>
      <VStack spacing={2} as="nav">
        {categories.map(({ name, categoriesId }) => (
          <PaperButton key={categoriesId} to={`/categories/${categoriesId}/`} width="100%">
            {name}
          </PaperButton>
        ))}
      </VStack>
      <Paper bgSchema="secondary">hoge</Paper>
    </>
  );
}

export default Sidebar;
