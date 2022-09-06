import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/features/userSlice";

const navLink =
  "text-center md:px-4 w-full py-3 inline-block text-white text-lg uppercase";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn, user } = useSelector((state) => state.user);

  const admin = user?.user?.role === "admin";

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    localStorage.removeItem("token");
  };
  return (
    <nav style={{ backgroundColor: "black" }} className="sticky top-0 z-50">
      <div className="conainer mx-auto px-4 flex flex-col md:flex-row  justify-start md:justify-between md:items-center">
        <div className="flex justify-between w-full">
          <Link
            to="/"
            className="py-1 inline-block text-white text-lg uppercase"
          >
            Clever Learner
          </Link>
        </div>

        <ul className="md:flex flex-col md:flex-row items-center justify-center transition">
          {admin && (
            <>
              <li className="w-full">
                <Link className={navLink} to={`/dashboard/${user?.user?._id}`}>
                  Dashboard
                </Link>
              </li>
              <li className="w-full">
                <Link className={navLink} to={`/users/${user?.user?._id}`}>
                  Users
                </Link>
              </li>
            </>
          )}

          {user?.user?._id ? (
            <li className="w-full">
              <button className={navLink} onClick={() => handleLogout()}>
                Logout
              </button>
            </li>
          ) : (
            <li className="w-full">
              <button className={navLink}>
                <Link to="/login">Login</Link>
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
