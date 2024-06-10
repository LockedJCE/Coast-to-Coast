import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Error from './pages/Error'
import About from './pages/About'
import TripDetail from './pages/TripDetail' // Import TripDetail component

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/me',
        element: <Profile />
      },
      {
        path: '/trip/:tripId', // Define the route for trip details
        element: <TripDetail />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)