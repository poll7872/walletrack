import { CreateBudgetForm } from "@/components/budgets/CreateBudgetForm";
import Link from "next/link";

export default function CreateBudgetPage() {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-slate-800 my-5">
            Nuevo Presupuesto
          </h1>
          <p className="text-xl font-bold text-slate-600">
            Llena el formulario y crea un nuevo {""}
            <span className="text-green-600">presupuesto</span>
          </p>
        </div>
        <Link
          href={"/admin"}
          className="bg-green-600 hover:bg-green-700 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Volver
        </Link>
      </div>

      <div className="p-10 mt-10 bg-white shadow-lg rounded-md max-w-3xl mx-auto">
        <CreateBudgetForm />
      </div>
    </>
  );
}
