"use client";

import { register } from "@/actions/create-account-action";
import { useActionState } from "react";

export const RegisterForm = () => {
  const [state, dispatch] = useActionState(register, {
    errors: [],
  });
  console.log(state);
  return (
    <form className="mt-10 space-y-6" noValidate action={dispatch}>
      <div className="relative">
        <input
          id="name"
          type="text"
          placeholder=" "
          className="block px-3.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          name="name"
        />
        <label
          htmlFor="name"
          className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Nombre
        </label>
      </div>

      <div className="relative">
        <input
          id="email"
          type="email"
          placeholder=" "
          className="block px-3.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          name="email"
        />
        <label
          htmlFor="email"
          className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Email
        </label>
      </div>

      <div className="relative">
        <input
          id="password"
          type="password"
          placeholder=" "
          className="block px-3.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          name="password"
        />
        <label
          htmlFor="password"
          className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Password
        </label>
      </div>

      <div className="relative">
        <input
          id="password_confirmation"
          type="password"
          placeholder=" "
          className="block px-3.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          name="password_confirmation"
        />
        <label
          htmlFor="password_confirmation"
          className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Repetir Password
        </label>
      </div>

      <input
        type="submit"
        value="Crear Cuenta"
        className="bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg text-white font-bold text-lg cursor-pointer"
      />
    </form>
  );
};
