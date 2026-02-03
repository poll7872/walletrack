import { DialogTitle } from "@headlessui/react";
import { ExpenseForm } from "./ExpenseForm";
import { useActionState, useEffect } from "react";
import createExpense from "@/actions/create-expense-action";
import { useParams } from "next/navigation";
import { ErrorMessage } from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export const AddExpenseForm = ({ closeModal }: { closeModal: () => void }) => {
  const { id } = useParams();

  const createExpenseWithBudgetId = createExpense.bind(null, Number(id));
  const [state, dispatch] = useActionState(createExpenseWithBudgetId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, { autoClose: 2000 });
      closeModal();
    }
  }, [state]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-slate-800 my-5">
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold text-slate-600">
        Llena el formulario y crea un {""}
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
        <ExpenseForm />
        <input
          type="submit"
          className="bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg text-white font-bold text-lg cursor-pointer"
          value="Registrar Gasto"
        />
      </form>
    </>
  );
};
