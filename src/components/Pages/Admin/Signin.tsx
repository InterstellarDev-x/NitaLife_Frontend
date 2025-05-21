import { useRef } from "react";
import { motion } from "framer-motion";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../ui/Toast";
import { signinSchema } from "../../../types";
import { API_URL } from "../../../Services/api";

export const Signin = () => {
  const toast = useToast();
  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const Navigate1 = useNavigate();

  async function signin() {
    const email = emailref.current?.value;
    const password = passwordref.current?.value;

    const zodvalidation = signinSchema.safeParse({ email, password });
    if (!zodvalidation.success) {
      if (zodvalidation.error?.format().email)
        toast(zodvalidation.error?.format().email?._errors[0] as string);
      if (zodvalidation.error?.format().password)
        toast(zodvalidation.error?.format().password?._errors[0] as string);
      return;
    }

    try {
      const response = await axios({
        method: "post",
        url: API_URL + "/admin/login",
        data: {
          email: email,
          password: password,
        },
      });

      if (response.data) {
        localStorage.setItem("token", response.data.token);
        Navigate1("/admin");
        toast("Welcome Admin");
      }
    } catch (e) {
      if ((e as AxiosError).response) {
        // @ts-expect-error(this error because msg is my backend variable)
        toast((e as AxiosError).response?.data?.message);
      } else if ((e as AxiosError).request) {
        console.log((e as AxiosError).request);
      } else {
        console.log("Internal server failed");
      }
    }
  }

  return (
    <div className="min-h-screen w-screen relative overflow-hidden font-sans bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
      {/* Subtle background animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-br from-purple-200 via-indigo-200 to-blue-200 opacity-30 rounded-full"
        style={{ width: '150%', height: '150%', top: '-25%', left: '-25%' }}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: -360 }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-tl from-pink-200 via-red-200 to-orange-200 opacity-20 rounded-full"
        style={{ width: '120%', height: '120%', top: '-10%', left: '-10%' }}
      />

      <div className="relative z-10 flex flex-col justify-center items-center gap-8 px-4 py-12 w-full max-w-md mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-center drop-shadow-md">
          Admin Login
        </h1>

        <div className="w-full bg-white p-8 rounded-2xl border border-gray-200 shadow-xl flex flex-col items-center gap-6">
          <h2 className="font-semibold text-3xl text-gray-800 mb-4">
            Sign{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
              In
            </span>
          </h2>
          <div className="w-full">
            <input
              type="email" // Changed type to email for better semantics
              placeholder="Enter your email"
              ref={emailref}
              className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 text-gray-800 placeholder-gray-400"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              ref={passwordref}
              className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 text-gray-800 placeholder-gray-400"
            />
          </div>
          <button
            onClick={signin}
            className="w-full py-3 mt-4 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 active:scale-95 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
