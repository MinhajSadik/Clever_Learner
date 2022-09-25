import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/features/userSlice";
import Loading from "../Shared/Loading";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => ({ ...state.user }));
  const [loginInfo, setLoginInfo] = useState(initialState);
  const { email, password } = loginInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginUser({ loginInfo, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="absolute top-0 left-0 h-screen w-full flex items-center bg-[rgba(0,0,0,.5)]">
          <div className=" text-center bg-white p-8 mx-auto rounded-lg max-w-[600px] w-11/12">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0 ">
                  Login an account
                </p>
              </div>
              {/* <!-- Email input --> */}
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={onInputChange}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                />
              </div>

              {/* <!-- Password input --> */}
              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={onInputChange}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                />
              </div>

              <div className="text-center lg:text-left ">
                <button className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  Login
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
