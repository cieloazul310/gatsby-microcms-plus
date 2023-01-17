import * as React from 'react';
import { useLocation } from '@reach/router';
import { Code } from '@chakra-ui/react';
import BasicLayout from '../layout/Basic';
import Paper from '../components/Paper';

function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <BasicLayout title="404 Not found">
      <Paper>
        <Code>{pathname}</Code> is not found.
      </Paper>
    </BasicLayout>
  );
}

export default NotFoundPage;
