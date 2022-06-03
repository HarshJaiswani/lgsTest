import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsEyeglasses } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import bcryptjs from "bcryptjs";

const AdminLogin = ({ setLoggedIn }) => {
  const router = useRouter();
  const [passCode, setPassCode] = useState("");
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const changeValue = (e) => {
    if (e.target.id == "username") {
      setUserName(e.target.value);
    } else if (e.target.id == "password") {
      setPassCode(e.target.value);
    }
  };

  const checkPassCode = (user, pass) => {
    let passObj = {
      admin: "$2a$10$cB.kmQmdNBLGTQ.XnaNqRuBVtQvf21BEVaXRsZ3Wodx8Do0KYef66"
    };
    for (let key in passObj) {
      if (key == user) {
        if (bcryptjs.compareSync(pass,passObj[user])) {
          setLoggedIn(true);
          toast.success("SignedIn Succesfully ! - Redirecting...", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            router.push("/createBlog");
          }, 3000);
        } else {
          toast.error("Wrong Credentials !", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-16 w-auto"
              src="/Assets/logo.png"
              alt="legrosh logo"
            />
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-500">
              Login To Proceed
            </h2>
          </div>
          <form className="mt-8 space-y-6" method="POST" onSubmit={(e) => e.preventDefault()}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  UserName
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  spellCheck="false"
                  autoComplete="off"
                  value={userName}
                  onChange={changeValue}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="UserName"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  autoComplete="off"
                  value={passCode}
                  spellCheck="false"
                  onChange={changeValue}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="PassCode"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div
                onClick={() => {
                  show ? setShow(false) : setShow(true);
                }}
                className="cursor-pointer"
              >
                <BsEyeglasses
                  className={`inline mx-2 text-3xl ${
                    show ? "text-red-400" : "text-green-400"
                  }`}
                />
                <span className="text-sm text-gray-400">Show PassCode</span>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 sm:hover:text-indigo-500"
                >
                  {" "}
                  Forgot your password?{" "}
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={() => checkPassCode(userName, passCode)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 sm:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 sm:group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
