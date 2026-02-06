"use client";

import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ConfirmPasswordForm from "./ConfirmPasswordForm";

export default function DeleteBudgetModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const deleteBudgetId = searchParams.get("deleteBudgetId");
  const show = deleteBudgetId ? true : false;

  const hideModal = new URLSearchParams(searchParams.toString());
  hideModal.delete("deleteBudgetId");
  
  return (
    <Dialog open={show} onClose={() => router.replace(`${pathname}?${hideModal}`)} className="relative z-50">
      <DialogBackdrop 
        transition
        className="fixed inset-0 bg-black/60 duration-300 ease-out data-closed:opacity-0" 
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-5xl duration-300 ease-out data-closed:scale-95 data-closed:opacity-0 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl p-16"
        >
          <ConfirmPasswordForm />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
