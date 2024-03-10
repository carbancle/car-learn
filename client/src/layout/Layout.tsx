import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Header/Navbar"
import { useAppDispatch, useAppSelector } from "../store"
import { useEffect } from "react";
import { authUser } from "../store/thunkFunction";

function Layout() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isAuth = useAppSelector((state) => state.user?.isAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch])


  return (
    <div className="layout">
      <header className="z-40 sticky top-0 left-0 right-0">
        <nav className="z-50 shadow-md h-16 min-h-[unset]">
          <Navbar />
        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default Layout