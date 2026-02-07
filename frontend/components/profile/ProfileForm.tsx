"use client";

import { updateUser } from "@/actions/update-user-action";
import { User } from "@/src/schemas";
import { useActionState, useEffect } from "react";
import { ErrorMessage } from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export default function ProfileForm({ user }: { user: User }) {
  const [state, dispatch] = useActionState(updateUser, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, { autoClose: 3000 });
    }
  }, [state]);

  return (
    <>
      <form className=" mt-14 space-y-5" noValidate action={dispatch}>
        {state.errors.map((error, index) => (
          <ErrorMessage key={index}>{error}</ErrorMessage>
        ))}
        <div className="relative">
          <input
            type="name"
            placeholder=" "
            className="block px-3.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            name="name"
            defaultValue={user.name}
          />

          <label className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
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
            defaultValue={user.email}
          />

          <label className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            Email
          </label>
        </div>

        <input
          type="submit"
          value="Guardar Cambios"
          className="bg-slate-800 hover:bg-slate-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
