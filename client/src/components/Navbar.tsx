import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, verify } from "../api";
import { setAuthenticated, setUser } from "../store/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../types";

const Navbar = () => {
  const token = sessionStorage.getItem("access_token") || "";
  const dispatch = useDispatch();
  const authenticate = async () => {
    const res = await verify(token);
    dispatch(setAuthenticated(res.authenticated));
    dispatch(setUser(res.user));
  };
  const isAuthenticated = useSelector(
    (state: RootState) => state.authData.authenticated
  );
  const user = useSelector((state: RootState) => state.authData.user);
  useEffect(() => {
    authenticate();
  }, []);
  return (
    <nav className="top-0 m-0 border-b border-gray-700 p-5 sticky backdrop-blur-sm grid grid-cols-2 lg:grid-cols-3 justify-between items-center z-10">
      <img src="/ship.svg" className="w-10 hidden lg:block" />
      <ul className="flex gap-5 justify-center items-center text-xs md:text-sm">
        <div className="flex gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">List an item</Link>
          </li>
          <li>
            <Link to="/profile">Transactions</Link>
          </li>
        </div>
      </ul>
      {isAuthenticated ? (
        <li className="flex gap-2 justify-end items-end">
          <p>{user.username}</p>
          <Link
            to="/login"
            className="btn btn-transparent hover:bg-white bg-slate-200 normal-case text-black btn-sm text-sm"
            onClick={logout}
          >
            Logout
          </Link>
        </li>
      ) : (
        <Link
          to="/login"
          className="btn btn-transparent hover:bg-white bg-slate-200 normal-case text-black btn-sm text-sm w-20"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
