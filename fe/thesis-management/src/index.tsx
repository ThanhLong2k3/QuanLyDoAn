import React from 'react';
import ReactDOM from 'react-dom/client';
import {  RouterProvider } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// Xóa dòng import 'antd/dist/antd.css';
import router from './ultils/routerProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);