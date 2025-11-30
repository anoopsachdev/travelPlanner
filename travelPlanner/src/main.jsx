import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from 'sonner'
import conf from "./conf/conf.js";
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]'
const router = createBrowserRouter([
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
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={conf.googleAuthClientId}>
    <Header/>
    <Toaster/>
    <RouterProvider router = {router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
