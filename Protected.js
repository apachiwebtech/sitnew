// Import necessary dependencies
import React from 'react';
import { createBrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Your authentication check function
const isAuthenticated = () => {
  // Replace with your actual authentication logic
  return localStorage.getItem('userId') !== null;
};

// ProtectedRoute component for authentication check
const ProtectedRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/log" replace state={{ from: rest.location.pathname }} />
  );
};

// Your route configuration
const Router = createBrowserRouter([
  {
    path: '/log',
    element: <Login />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute element={<DashBoard />} />,
      },
      {
        path: '/eform',
        element: <ProtectedRoute element={<EmergencyForm />} />,
      },
      {
        path: '/vendormaster',
        element: <ProtectedRoute element={<VendorMaster />} />,
      },
      {
        path: '/adminuser',
        element: <ProtectedRoute element={<AdminUser />} />,
      },
      {
        path: '/category',
        element: <ProtectedRoute element={<Category />} />,
      },
      {
        path: '/subcategory',
        element: <ProtectedRoute element={<SubCatetgory />} />,
      },
    ],
  },
]);

export default Router;
