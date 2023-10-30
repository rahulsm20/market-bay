import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, verify } from "../api";
import { setAuthenticated, setUser } from "../store/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../types";

const Navbar = () => {
  const token = sessionStorage.getItem("access_token") || "";
  const dispatch = useDispatch()
  const authenticate = async () => {
    const res = await verify(token);
    dispatch(setAuthenticated(res.authenticated))
    dispatch(setUser(res.user))
    console.log(res)
  };
  const isAuthenticated = useSelector((state:RootState)=>state.authData.authenticated)
  const user = useSelector((state:RootState)=>state.authData.user)
  useEffect(() => {
    authenticate();
  }, []);
  return (
    <div className="top-0 m-0 bg-gray-900 p-5">
      <ul className="flex gap-5 justify-between items-center">
        <div className="flex gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add item</Link>
          </li>
        </div>
        {isAuthenticated ? (
          <li className="flex gap-2 justify-center items-center">
            <p>{user.username}</p>
            <Link to="/login" className="btn btn-transparent hover:bg-white bg-slate-200 normal-case text-black btn-sm text-sm" onClick={logout}>
              Logout
            </Link>
          </li>
        ) : (
            <Link to="/login" className="btn btn-transparent hover:bg-white bg-slate-200 normal-case text-black btn-sm text-sm">Login</Link>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
