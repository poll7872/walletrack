import { resetPassword } from "@/actions/reset-password-action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const resetPasswordWithToken = resetPassword.bind(null, token);
  const [state, dispatch] = useActionState(resetPasswordWithToken, {
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
      toast.success(state.success, {
        autoClose: 2000,
        onClose: () => {
          router.push("/auth/login");
        },
        onClick: () => {
          router.push("/auth/login");
        },
      });
    }
  }, [state]);

  return (
    <form className=" mt-14 space-y-5" noValidate action={dispatch}>
      <div className="relative">
        <input
          id="password"
          type="password"
          placeholder=" "
          className="block px-3.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          name="password"
        />
        <label
          htmlFor="password"
          className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Password
        </label>
      </div>

      <div className="relative">
        <input
          id="password_confirmation"
          type="password"
          placeholder=" "
          className="block px-3.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          name="password_confirmation"
        />
        <label
          htmlFor="password_confirmation"
          className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Repetir Password
        </label>
      </div>

      <input
        type="submit"
        value="Guardar Contraseña"
        className="bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg text-white font-bold text-lg cursor-pointer"
      />
    </form>
  );
};
