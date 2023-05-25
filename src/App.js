import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.css';
import Purchased from './pages/Purchased/Purchased';
import NoPurchased from './pages/NoPurchased/NoPurchased';


export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/purchased',
      element: <Purchased/>
    },
    {
      path: '/nopurchased',
      element: <NoPurchased/>
    }
  ]);
  return <RouterProvider router={router} fallbackElement={<h3>loading</h3>} />;
}


