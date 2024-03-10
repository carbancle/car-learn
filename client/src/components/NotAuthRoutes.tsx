import { Navigate, Outlet, useOutletContext } from "react-router-dom"

function NotAuthRoutes() {
  const isAuth = useOutletContext();
  return (
    isAuth ? <Navigate to={"/"} /> : <Outlet />
  )
}

export default NotAuthRoutes