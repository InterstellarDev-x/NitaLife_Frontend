import { useRef } from "react";

import { motion } from "framer-motion";

import axios, { AxiosError } from "axios";







import { useNavigate } from "react-router-dom";
import { useToast } from "../../ui/Toast";
import { signinSchema } from "../../../types";
import { API_URL } from "../../../Services/api";



export const Signin = () => {

  const toast = useToast()
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

  if(response.data){

  localStorage.setItem("token" , response.data.token)

    Navigate1("/admin" );
    toast("Welcome Admin"  );
  }
}catch (e) {
  if ((e as AxiosError).response) {
    //@ts-expect-error(this error beacuse msg is my backend variable)
         toast((e as AxiosError).response?.data?.message)
  } else if ((e as AxiosError).request) {
        console.log((e as AxiosError).request)
  } else {
    console.log("Internal server failed")
  }
}
    
    
  }





  return (
    <div className="min-h-screen w-screen relative overflow-hidden">
      <motion.div
      animate={{
        scale : [5 , 10 , 15 , 10 , 5],
        rotate : [0 , 90 , 180 , 270 , 360]
      }}

      transition={{
        duration : 7,
        ease : "easeInOut",
        repeat : Infinity
      }}
      className="absolute inset-0 bg-gray-200 bg-[url('https://images.unsplash.com/photo-1534156039819-c89418369a4f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center z-0" />
      <div className="relative z-10 flex flex-col justify-center items-center gap-6 px-4 min-h-screen">
        <h1 className="text-3xl sm:text-4xl font-SemiBrand md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent text-center">
          Admin Login
        </h1>

        <div className="w-[90%] max-w-md bg-white flex flex-col items-center justify-center gap-4 p-6 rounded-xl border border-blue-200 shadow-xl backdrop-blur-sm mx-auto">
            <h1 className="font-Palanquin text-3xl pb-10 font-extrabold">
              Sign <span className=" bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">In</span>
          </h1>
          <div className="w-full px-6">
            <input
              type="text"
              placeholder="Enter your email"
              ref={emailref}
              className="w-full p-3 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
          <div className="w-full px-6">
            <input
              type="password"
              placeholder="Password"
              ref={passwordref}
              className="w-full p-3 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
          <button
            onClick={signin}
            className=" active:scale-90 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 mt-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            Sign In
          </button>

          
        </div>
      </div>
    </div>
  );
};