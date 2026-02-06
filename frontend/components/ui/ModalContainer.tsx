"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { AddExpenseForm } from "../expenses/AddExpenseForm";
import { EditExpenseForm } from "../expenses/EditExpenseForm";
import { DeleteExpenseForm } from "../expenses/DeleteExpenseForm";

const componentsMap = {
  AddExpense: AddExpenseForm,
  EditExpense: EditExpenseForm,
  DeleteExpense: DeleteExpenseForm,
};

export const ModalContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showModal = searchParams.get("showModal");

  const show = showModal ? true : false;

  const addExpense = searchParams.get("addExpense");
  const editExpense = searchParams.get("editExpenseId");
  const deleteExpense = searchParams.get("deleteExpenseId");

  const getComponent = () => {
    if (addExpense) return "AddExpense";
    if (editExpense) return "EditExpense";
    if (deleteExpense) return "DeleteExpense";
  };

  const componentName = getComponent();
  const ComponentToRender = componentName ? componentsMap[componentName] : null;

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString());
    Array.from(hideModal.entries()).forEach(([key]) => {
      hideModal.delete(key);
    });
    router.replace(`${pathname}?${hideModal}`);
  };

  return (
    <Dialog open={show} onClose={closeModal} className="relative z-50">
      <DialogBackdrop 
        transition
        className="fixed inset-0 bg-black/60 duration-300 ease-out data-closed:opacity-0" 
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-5xl duration-300 ease-out data-closed:scale-95 data-closed:opacity-0 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl p-16"
        >
          {ComponentToRender ? (
            <ComponentToRender closeModal={closeModal} />
          ) : null}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
