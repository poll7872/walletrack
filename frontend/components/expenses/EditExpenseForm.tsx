import { DialogTitle } from "@headlessui/react";
import { ExpenseForm } from "./ExpenseForm";

export const EditExpenseForm = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-slate-800 my-5">
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Edita los detalles de un {""}
        <span className="text-green-600">gasto</span>
      </p>
      <form className="shadow-md rounded-lg p-10 mt-10 space-y-6" noValidate>
        <ExpenseForm />
        <input
          type="submit"
          className="bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg text-white font-bold text-lg cursor-pointer"
          value="Guardar Cambios"
        />
      </form>
    </>
  );
};
