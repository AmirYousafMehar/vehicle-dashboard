import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../components/templates/AppLayout/AppLayout'
import { ListingPage } from '../components/pages/ListingPage/ListingPage'
import { FormPage } from '../components/pages/FormPage/FormPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/listing" replace /> },
      { path: 'listing', element: <ListingPage /> },
      { path: 'form', element: <FormPage /> },
    ],
  },
])

