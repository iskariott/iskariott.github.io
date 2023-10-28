import { useEffect } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from '@components/Header/Header';
import Zksync from '@pages/Zksync/Zksync';
import Aptos from '@pages/Aptos/Aptos';
import Starknet from '@pages/Starknet/Starknet';

const Root = () => {
  useEffect(() => {
    const currentVersion = '1.2';
    const storedVersion = localStorage.getItem('ver');
    if (storedVersion !== currentVersion) {
      localStorage.clear();
      localStorage.setItem('ver', currentVersion);
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'aptos',
        element: <Aptos />,
      },
      {
        path: 'zksync',
        element: <Zksync />,
      },
      {
        path: 'starknet',
        element: <Starknet />,
      },
    ],
  },
]);