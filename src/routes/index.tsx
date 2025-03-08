import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Game from '../pages/Game';
import Results from '../pages/Results';
import Layout from '../components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'game',
        element: <Game />,
      },
      {
        path: 'results',
        element: <Results />,
      },
    ],
  },
]);

export default router;
