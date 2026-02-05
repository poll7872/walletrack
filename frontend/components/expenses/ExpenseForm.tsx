import { DraftExpense } from "@/src/schemas";

type ExpenseFormProps = {
  expense?: DraftExpense;
};

export const ExpenseForm = ({ expense }: ExpenseFormProps) => {
  return (
    <>
      <div className="relative">
        <input
          id="name"
          className="block px-3.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          type="text"
          placeholder=" "
          name="name"
          defaultValue={expense?.name}
        />
        <label
          htmlFor="name"
          className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Nombre Gasto
        </label>
      </div>

      <div className="relative">
        <input
          id="amount"
          type="number"
          className="block px-3.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
          name="amount"
          defaultValue={expense?.amount}
        />
        <label
          htmlFor="amount"
          className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Cantidad Gasto
        </label>
      </div>
    </>
  );
};
