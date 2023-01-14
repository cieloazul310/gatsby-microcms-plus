import * as React from 'react';
import { useLocation } from '@reach/router';

function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <div>
      <h1>404 Not found</h1>
      <p>
        <code>{pathname}</code> is not found.
      </p>
    </div>
  );
}

export default NotFoundPage;
