import BudgetMenu from "@/components/auth/BudgetMenu";
import { getToken } from "@/src/auth/token";
import { BudgetsAPIResponseSchema } from "@/src/schemas";
import { formatCurrency, formatDate } from "@/src/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Walletrack | Admin",
  description: "Administra tus presupuestos en Walletrack",
};

async function getUserBudgets() {
  const token = await getToken();
  const url = `${process.env.API_URL}/budgets`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();

  const budgets = BudgetsAPIResponseSchema.parse(json);
  return budgets;
}

export default async function AdminPage() {
  const budgets = await getUserBudgets();
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-slate-800 my-5">
            Mis Presupuestos
          </h1>
          <p className="text-xl font-bold text-slate-600">
            Maneja y administra tus {""}
            <span className="text-green-600">presupuestos</span>
          </p>
        </div>
        <Link
          href={"/admin/budgets/new"}
          className="bg-green-600 hover:bg-green-700 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Crear Presupuesto
        </Link>
      </div>

      {budgets.length ? (
        <ul
          role="list"
          className="divide-y divide-gray-200 border border-gray-200 rounded-md shadow-sm mt-10 "
        >
          {budgets.map((budget) => (
            <li key={budget.id} className="flex justify-between gap-x-6 p-5 ">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <Link
                      href={`/admin/budgets/${budget.id}`}
                      className="cursor-pointer hover:underline text-lg font-bold"
                    >
                      {budget.name}
                    </Link>
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(+budget.amount)}
                  </p>
                  <p className="text-slate-500  text-sm">
                    Ultima Actualización: {""}
                    <span className="font-bold">
                      {formatDate(budget.updatedAt)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <BudgetMenu budgetId={budget.id} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center mt-10 text-slate-600'>
          No hay prespuestos aún {""}
          <Link href={"/admin/budgets/new"} className='text-green-600 font-bold'>Comienza creando uno</Link>
        </p>
      )}
    </>
  );
}
