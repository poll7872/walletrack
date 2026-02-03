import { AddExpenseButton } from "@/components/expenses/AddExpenseButton";
import { ModalContainer } from "@/components/ui/ModalContainer";
import { getBudget } from "@/src/services/budgets";
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

      <ModalContainer />
    </>
  );
}
