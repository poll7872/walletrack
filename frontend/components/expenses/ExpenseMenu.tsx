"use client";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Expense } from "@/src/schemas";

export const ExpenseMenu = ({ expenseId }: { expenseId: Expense["id"] }) => {
  const router = useRouter();

  return (
    <div className="flex shrink-0 items-center gap-x-6">
      <Menu>
        <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
          <span className="sr-only">opciones</span>
          <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
        </MenuButton>
        <MenuItems 
          anchor="bottom"
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
        >
          <MenuItem>
            <button
              type="button"
              className="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 data-focus:bg-gray-50"
              onClick={() =>
                router.push(`?showModal=true&editExpenseId=${expenseId}`)
              }
            >
              Editar Gasto
            </button>
          </MenuItem>

          <MenuItem>
            <button
              type="button"
              className="block w-full px-3 py-1 text-left text-sm leading-6 text-red-500 data-focus:bg-red-50"
              onClick={() =>
                router.push(`?showModal=true&deleteExpenseId=${expenseId}`)
              }
            >
              Eliminar Gasto
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};
