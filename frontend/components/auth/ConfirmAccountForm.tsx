"use client";
import { confirmAccount } from "@/actions/confirm-account-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ConfirmAccountForm = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [state, dispatch] = useActionState(confirmAccount, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error, {
          autoClose: 4000,
        });
      });
    }
    if (state.success) {
      toast.success(state.success, {
        autoClose: 3000,
        onClose: () => {
          router.push("/auth/login");
        },
      });
    }
  }, [state]);

  const handleComplete = (value: string) => {
    const formData = new FormData();
    formData.append("token", value);
    startTransition(() => {
      dispatch(formData);
    });
  };

  return (
    <>
      <div className="flex justify-center gap-4 my-8">
        <PinInput value={token} onChange={setToken} onComplete={handleComplete}>
          <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white" />
        </PinInput>
      </div>
    </>
  );
};
