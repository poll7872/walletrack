import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";

type ValidateTokenFormProps = {
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

export const ValidateTokenForm = ({
  setIsValidToken,
  token,
  setToken,
}: ValidateTokenFormProps) => {
  const [state, dispatch] = useActionState(validateToken, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error, { autoClose: 4000 });
      });
    }

    if (state.success) {
      toast.success(state.success, { autoClose: 3000 });
      setIsValidToken(true);
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
    <div className="flex justify-center gap-5 my-10">
      <PinInput value={token} onChange={setToken} onComplete={handleComplete}>
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  );
};
