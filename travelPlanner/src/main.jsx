import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // Ensure imports are from react-router-dom
import CreateTrip from './create-trip'
import Header from './components/custom/Header' // You can remove this import if you want, as it's not used here anymore
import { Toaster } from 'sonner'
import conf from "./conf/conf.js";
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]'
import MyTrips from './my-trips'
import Layout from './components/custom/Layout' // 1. Import the Layout

const router = createBrowserRouter([
  {
    element: <Layout />, // 2. Wrap all routes with Layout contains header and the outlet will render the child routes
    children: [
      {
        path: '/',
        element:<App/>
      },
      {
        path: '/create-trip',
        element: <CreateTrip/>
      },
      {
        path: "/view-trip/:tripId",
        element: <ViewTrip />,
      },
      {
        path: "/my-trip", 
        element : <MyTrips/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={conf.googleAuthClientId}>
    <Toaster/>
    <RouterProvider router = {router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)