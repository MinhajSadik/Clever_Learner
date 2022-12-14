import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../redux/features/userSlice";
import ModalView from "../customs/ModalView";
import Loading from "../Shared/Loading";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.user }));
  const { name, email, password } = registerInfo;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      dispatch(registerUser({ registerInfo, navigate, toast }));
    }
  };

  useEffect(() => {
    if (error || loading) {
      error && toast.error(error);
    }
  }, [error, loading]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ModalView>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0 ">
                Register an account
              </p>
            </div>

            <div className="mb-6">
              <input
                type="name"
                name="name"
                required
                value={name}
                onChange={onInputChange}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="what's your name?"
              />
            </div>

            <div className="mb-6">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={onInputChange}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Enter your unique email"
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={onInputChange}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Enter strong password"
              />
            </div>

            <div className="text-center lg:text-left  ">
              <button className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Register
              </button>
              <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </ModalView>
      )}
    </>
  );
};

export default Register;
