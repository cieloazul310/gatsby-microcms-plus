import * as React from 'react';
import { VStack } from '@chakra-ui/react';
import PaperButton from '../components/PaperButton';
import useMenu from '../utils/useMenu';

function Sidebar() {
  const menu = useMenu();
  return (
    <>
      {menu.map(({ name, items }) => (
        <VStack key={name} spacing={2} as="nav">
          {items.map(({ path, ...item }) => (
            <PaperButton key={item.name} to={path} width="100%">
              {item.name}
            </PaperButton>
          ))}
        </VStack>
      ))}
    </>
  );
}

export default Sidebar;
