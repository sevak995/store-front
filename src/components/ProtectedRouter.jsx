import { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../redux/authSlice";
import Login from "../pages/login/Login";

export default function ProtectedRouter({ children }) {
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchUser());
  }, [user]);

  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Login />;
  }
}
