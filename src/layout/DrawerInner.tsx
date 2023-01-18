import * as React from 'react';
import { VStack } from '@chakra-ui/react';
import PaperButton from '../components/PaperButton';
import useMenu from '../utils/useMenu';

function DrawerInner() {
  const menu = useMenu();
  return (
    <>
      {menu.map(({ name, items }) => (
        <VStack key={name} spacing={1}>
          {items.map(({ path, ...item }) => (
            <PaperButton key={item.name} to={path} width="100%" size="sm">
              {item.name}
            </PaperButton>
          ))}
        </VStack>
      ))}
      {menu.map(({ name, items }) => (
        <VStack key={name} spacing={1}>
          {items.map(({ path, ...item }) => (
            <PaperButton key={item.name} to={path} width="100%" size="sm">
              {item.name}
            </PaperButton>
          ))}
        </VStack>
      ))}
      {menu.map(({ name, items }) => (
        <VStack key={name} spacing={1}>
          {items.map(({ path, ...item }) => (
            <PaperButton key={item.name} to={path} width="100%" size="sm">
              {item.name}
            </PaperButton>
          ))}
        </VStack>
      ))}
    </>
  );
}

export default DrawerInner;
