import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GreenAlert } from "../componenets/GreenAlert";
import { useUser } from "../UserContext";
import {AlarmPlusIcon} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [showAlert, setShowAlert] = useState();
  const [formDisabled, setFormDisabled] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate(false);
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await axios.post(
        API_BASE_URL + "/login",
        {
          email,
          password,
        },
      );

      if (status == 200) {
        console.log(data.user.email);
        login(data.user);

        setFormDisabled(true);
        setShowAlert(true);
        setMessage("Logged in....Please wait while we redirect you");

        setTimeout(() => {
          setShowAlert(false);
          navigate("/");
        }, 4 * 1000);
      } else {
        console.log("There was some problem logging in");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className= "w-full flex flex-col items-center justify-center border-solid p-10 rounded-md border-blue-gray-600">
      <Link className="font-medium text-black transition-all duration-200 hover:underline">
        Home
      </Link>
      <h2  className="text-3xl font-bold leading-tight text-black">Log In</h2>
      <p className="mt-2 text-base text-gray-600">
        Don't have an account?
        <Link
          className="font-medium text-black transition-all duration-200 hover:underline"
          to="/signup"
        >
          {"  "}Sign Up
        </Link>
      </p>
      <form className="mt-8" onSubmit={handleLogin}>
        <div className="space-y-5">
          <div>
            <label for="email" class="text-base font-medium text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                disabled={formDisabled}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <label for="password" class="text-base font-medium text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                disabled={formDisabled}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            {!formDisabled && (
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              >
                Log In
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            )}
          </div>
        </div>
      </form>
      <div className="mt-6">
        {showAlert && <GreenAlert message={message} />}
      </div>
    </div>
  );
}
