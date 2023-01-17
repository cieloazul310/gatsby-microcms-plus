import * as React from 'react';
import { useColorMode } from '@chakra-ui/react';

function useGradientBox() {
  const { colorMode } = useColorMode();
  return React.useMemo(() => {
    const primary = colorMode === 'light' ? 'primary.500' : 'primary.700';
    const secondary = colorMode === 'light' ? 'secondary.100' : 'gray.900';

    return {
      color: 'white',
      bgGradient: `linear(to-r, ${primary}, ${secondary})`,
    };
  }, [colorMode]);
}

export default useGradientBox;
