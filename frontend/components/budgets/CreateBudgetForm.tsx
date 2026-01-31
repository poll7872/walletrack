"use client";

import { createBudget } from "@/actions/create-budget-action";
import { useActionState, useEffect } from "react";
import { ErrorMessage } from "../ui/ErrorMessage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BudgetForm } from "./BudgetForm";

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
      <BudgetForm />
      <input
        type="submit"
        className="bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg text-white font-bold text-lg cursor-pointer"
        value="Crear Presupuesto"
      />
    </form>
  );
};
