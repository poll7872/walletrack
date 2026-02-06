"use client";
import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Budget } from "@/src/schemas";
import { useRouter } from "next/navigation";

export default function BudgetMenu({ budgetId }: { budgetId: Budget["id"] }) {
  const router = useRouter();

  return (
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
          <Link
            href={`/admin/budgets/${budgetId}`}
            className="block px-3 py-1 text-sm leading-6 text-gray-900 data-focus:bg-gray-50"
          >
            Ver Presupuesto
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href={`/admin/budgets/${budgetId}/edit`}
            className="block px-3 py-1 text-sm leading-6 text-gray-900 data-focus:bg-gray-50"
          >
            Editar Presupuesto
          </Link>
        </MenuItem>

        <MenuItem>
          <button
            type="button"
            className="block px-3 py-1 text-sm leading-6 text-red-500 data-focus:bg-red-50"
            onClick={() => router.push(`?deleteBudgetId=${budgetId}`)}
          >
            Eliminar Presupuesto
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
