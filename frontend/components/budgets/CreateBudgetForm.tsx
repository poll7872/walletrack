"use client";

import { createBudget } from "@/actions/create-budget-action";
import { useActionState, useEffect } from "react";
import { ErrorMessage } from "../ui/ErrorMessage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const CreateBudgetForm = () => {
  const router = useRouter();
  const [state, dispatch] = useActionState(createBudget, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        autoClose: 2000,
        onClose: () => {
          router.push("/admin");
        },
        onClick: () => {
          router.push("/admin");
        },
      });
    }
  }, [state]);

  return (
    <form className="space-y-5" noValidate action={dispatch}>
      {state.errors.length > 0 && (
        <div className="space-y-2">
          {state.errors.map((error, index) => (
            <ErrorMessage key={index}>{error}</ErrorMessage>
          ))}
        </div>
      )}
      <div className="relative">
        <input
          id="name"
          className="block px-3.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          type="text"
          placeholder=" "
          name="name"
        />
        <label
          htmlFor="name"
          className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Nombre del Presupuesto
        </label>
      </div>
      <div className="relative">
        <input
          type="number"
          id="amount"
          className="block px-3.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
          name="amount"
        />
        <label
          htmlFor="amount"
          className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Cantidad del Presupuesto
        </label>
      </div>
      <input
        type="submit"
        className="bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg text-white font-bold text-lg cursor-pointer"
        value="Crear Presupuesto"
      />
    </form>
  );
};
