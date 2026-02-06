"use client";

import { useTransition } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { User } from "@/src/schemas";
import { logout } from "@/actions/logout-user";

export default function AdminMenu({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <Popover>
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-green-600 data-hover:bg-green-700 data-focus:bg-green-700">
        <Bars3Icon className="w-8 h-8 text-white " />
      </PopoverButton>

      <PopoverPanel 
        anchor="bottom"
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 data-enter:scale-100 data-enter:opacity-100"
      >
        <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
          <p className="text-center">Hola: {user.name} </p>
          <Link
            href="/admin/profile/settings"
            className="block p-2 hover:text-green-700 data-hover:text-green-700"
          >
            Mi Perfil
          </Link>
          <Link href="/admin" className="block p-2 hover:text-green-700 data-hover:text-green-700">
            Mis Presupuestos
          </Link>
          <button
            className="block p-2 hover:text-green-700 data-hover:text-green-700 w-full text-left disabled:opacity-50"
            type="button"
            onClick={handleLogout}
            disabled={isPending}
          >
            {isPending ? "Cerrando Sesión..." : "Cerrar Sesión"}
          </button>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
