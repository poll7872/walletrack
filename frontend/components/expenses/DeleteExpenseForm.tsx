import { useParams, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { startTransition, useActionState, useEffect } from "react";
import deleteExpense from "@/actions/delete-expense-action";
import { ErrorMessage } from "../ui/ErrorMessage";
import { toast } from "react-toastify";

type DeleteExpenseForm = {
  closeModal: () => void;
};

export const DeleteExpenseForm = ({ closeModal }: DeleteExpenseForm) => {
  const { id: budgetId } = useParams();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("deleteExpenseId");

  const deleteExpenseWithBudgetId = deleteExpense.bind(null, {
    budgetId: Number(budgetId),
    expenseId: Number(expenseId),
  });
  const [state, dispatch, pending] = useActionState(deleteExpenseWithBudgetId, {
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
        Eliminar Gasto
      </DialogTitle>
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}
      <p className="text-xl text-slate-600 font-bold">
        Confirma para eliminar, {""}
        <span className="text-green-600">el gasto</span>
      </p>
      <p className="text-slate-600 text-sm">
        (Un gasto eliminado no se puede recuperar)
      </p>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <button
          className="bg-slate-600 w-full p-3 text-white uppercase font-bold hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 rounded-lg cursor-pointer transition-colors disabled:opacity-50"
          disabled={pending}
          onClick={() => {
            startTransition(() => {
              dispatch(new FormData());
            });
          }}
        >
          {pending ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </>
  );
};
