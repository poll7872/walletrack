import { ProgressBar } from "@/components/budgets/ProgressBar";
import { AddExpenseButton } from "@/components/expenses/AddExpenseButton";
import { ExpenseMenu } from "@/components/expenses/ExpenseMenu";
import { Amount } from "@/components/ui/Amount";
import { ModalContainer } from "@/components/ui/ModalContainer";
import { getBudget } from "@/src/services/budgets";
import { formatCurrency, formatDate } from "@/src/utils";
import { Metadata } from "next";

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

export default async function BudgetDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const budget = await getBudget(id);

  const totalSpent = budget.expenses.reduce(
    (total, expense) => +expense.amount + total,
    0,
  );

  const percentage = +((totalSpent / +budget.amount) * 100).toFixed(2);

  const totalAvailable = +budget.amount - totalSpent;
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-black text-4xl text-slate-800">{budget.name}</h1>
          <p className="text-xl font-bold text-slate-600">
            Administra tus {""} <span className="text-green-600">gastos</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>

      {budget.expenses.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
            <ProgressBar percentage={percentage} />
            <div className="flex flex-col justify-center items-center md:items-start gap-2">
              <Amount label="Presupuesto" amount={+budget.amount} />
              <Amount label="Disponible" amount={totalAvailable} />
              <Amount label="Gastado" amount={totalSpent} />
            </div>
          </div>

          <h1 className="font-black text-4xl text-slate-800 mt-10">
            Gastos en este presupuesto
          </h1>
          <ul role="list" className="divide-y divide-gray-300 shadow-lg mt-10 ">
            {budget.expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-semibold text-slate-800">
                      {expense.name}
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(+expense.amount)}
                    </p>
                    <p className="text-slate-600  text-sm">
                      Agregado: {""}
                      <span className="font-bold">
                        {formatDate(expense.updatedAt)}
                      </span>
                    </p>
                  </div>
                </div>

                <ExpenseMenu expenseId={expense.id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center text-slate-600 py-20">No hay gastos aún</p>
      )}
      <ModalContainer />
    </>
  );
}
