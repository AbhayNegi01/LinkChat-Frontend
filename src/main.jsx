import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from './components'
import Home from "./pages/Home.jsx"
import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import Settings from './pages/settings.jsx'
import Profile from './pages/profile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authentication>
            <Home />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/settings',
        element: (
            <Settings />
        )
      },
      {
        path: '/profile',
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        )
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
