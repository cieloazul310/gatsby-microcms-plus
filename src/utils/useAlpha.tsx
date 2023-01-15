import * as React from 'react';
import { useToken } from '@chakra-ui/react';
import { colord } from 'colord';

function useAlpha(token: string, alpha: number) {
  const [color] = useToken('colors', [token]);
  return React.useMemo(() => colord(color).alpha(alpha), [token, alpha]).toRgbString();
}

export default useAlpha;
