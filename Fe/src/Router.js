import { useRoutes } from 'react-router-dom';

import Home from './Pages/Home';
import NewContacts from './Pages/NewContacts';
import EditContacts from './Pages/EditContacts';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/new',
      element: <NewContacts />,
    },
    {
      path: '/edit/:id',
      element: <EditContacts />,
    },
  ]);

  return routes;
}
