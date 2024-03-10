import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import MainPage from './pages/MainPage/MainPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import NotAuthRoutes from './components/NotAuthRoutes'
import LoginPage from './pages/LoginPage/LoginPage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout />
      ),
      children: [
        {
          path: "",
          element: <MainPage />
        },
        {
          element: <NotAuthRoutes />,
          children: [
            {
              path: "register",
              element: <RegisterPage />
            }
          ]
        },
        {
          children: [
            {
              path: "login",
              element: <LoginPage />
            }
          ]
        }
      ]
    }
  ])

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
