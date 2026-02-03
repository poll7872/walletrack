import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { DialogTitle } from "@headlessui/react";
import { deleteBudget } from "@/actions/delete-budget-action";
import { useActionState } from "react";
import { ErrorMessage } from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export default function ConfirmPasswordForm() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const budgetId = +searchParams.get("deleteBudgetId")!;

  const deleteBudgetWithId = deleteBudget.bind(null, budgetId);
  const [state, dispatch] = useActionState(deleteBudgetWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, { autoClose: 3000 });
      closeModal();
    }
  }, [state]);

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString());
    hideModal.delete("deleteBudgetId");
    router.replace(`${pathname}?${hideModal}`);
  };

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-slate-800 my-2">
        Eliminar Presupuesto
      </DialogTitle>
      <p className="text-xl text-slate-600 font-bold">
        Ingresa tu Password para {""}
        <span className="text-green-600">eliminar el presupuesto {""}</span>
      </p>
      <p className="text-gray-600 text-sm">
        (Un presupuesto eliminado y sus gastos no se pueden recuperar)
      </p>
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}
      <form className=" mt-8 space-y-6" noValidate action={dispatch}>
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
            Ingresa tu password para eliminar
          </label>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="submit"
            value="Eliminar Presupuesto"
            className="bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg text-white font-bold text-lg cursor-pointer"
          />
          <button
            className="bg-slate-600 hover:bg-slate-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}
