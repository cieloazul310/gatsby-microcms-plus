import * as React from 'react';
import { VStack } from '@chakra-ui/react';
import PaperButton from '../components/PaperButton';
import useMenu from '../utils/useMenu';

function DrawerMenu() {
  const menu = useMenu();
  return (
    <>
      <PaperButton href="/about/" size="sm">
        About
      </PaperButton>
      {menu.map(({ name, items }) => (
        <VStack key={name} spacing={1} align="stretch">
          {items.map(({ path, ...item }) => (
            <PaperButton key={item.name} href={path} size="sm">
              {item.name}
            </PaperButton>
          ))}
        </VStack>
      ))}
    </>
  );
}

export default DrawerMenu;
