
import { lazy } from 'react';

const routes = [
  {
    path: 'collection',
    component: lazy(() => import('../../src/pages/my-collection')),
    exact: true
  }
];

export default routes;