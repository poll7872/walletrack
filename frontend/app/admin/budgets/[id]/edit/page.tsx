import { EditBudgetForm } from "@/components/budgets/EditBudgetForm";
import { getBudget } from "@/src/services/budgets";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const budget = await getBudget(id);

  return {
    title: `Walletrack | ${budget.name}`,
    description: `Administra tu presupuesto ${budget.name} en Walletrack`,
  };
}

export default async function EditBudgetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const budget = await getBudget(id);
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-slate-800 my-5">
            Editar Presupuesto: {budget.name}
          </h1>
          <p className="text-xl font-bold text-slate-600">
            Modifica el formulario y actualiza un {""}
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
        <EditBudgetForm budget={budget} />
      </div>
    </>
  );
}
