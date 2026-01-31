"use client";
import { Budget } from "@/src/schemas";
import { BudgetForm } from "./BudgetForm";
import { useActionState, useEffect } from "react";
import { editBudget } from "@/actions/edit-budget-action";
import { ErrorMessage } from "../ui/ErrorMessage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const EditBudgetForm = ({ budget }: { budget: Budget }) => {
  const router = useRouter();
  const editBudgetWithId = editBudget.bind(null, budget.id);
  const [state, dispatch] = useActionState(editBudgetWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        autoClose: 2000,
      });

      router.push("/admin");
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
      <BudgetForm budget={budget} />
      <input
        type="submit"
        className="bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg text-white font-bold text-lg cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
};
