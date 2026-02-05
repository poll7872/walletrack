import { DialogTitle } from "@headlessui/react";
import { ExpenseForm } from "./ExpenseForm";
import { useActionState, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { DraftExpense } from "@/src/schemas";
import editExpense from "@/actions/edit-expense-action";
import { ErrorMessage } from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export const EditExpenseForm = ({ closeModal }: { closeModal: () => void }) => {
  const [expense, setExpense] = useState<DraftExpense>();
  const { id: budgetId } = useParams();
  const searchPrams = useSearchParams();
  const expenseId = searchPrams.get("editExpenseId");

  const editExpenseWithBudgetId = editExpense.bind(null, {
    budgetId: Number(budgetId),
    expenseId: Number(expenseId),
  });
  const [state, dispatch] = useActionState(editExpenseWithBudgetId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setExpense(data));
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, { autoClose: 2000 });
      closeModal();
    }
  }, [state]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-slate-800 my-5">
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Edita los detalles de un {""}
        <span className="text-green-600">gasto</span>
      </p>
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}
      <form
        className="shadow-md rounded-lg p-10 mt-10 space-y-6"
        noValidate
        action={dispatch}
      >
        <ExpenseForm expense={expense} />
        <input
          type="submit"
          className="bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg text-white font-bold text-lg cursor-pointer"
          value="Guardar Cambios"
        />
      </form>
    </>
  );
};
