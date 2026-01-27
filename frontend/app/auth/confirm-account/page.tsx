import { ConfirmAccountForm } from "@/components/auth/ConfirmAccountForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Walletrack | Confirmar cuenta",
  description: "Confirmar cuenta en Walletrack",
};

export default function ConfirmAccountPage() {
  return (
    <>
      <h1 className="text-4xl font-black text-slate-800">Confirma tu cuenta</h1>
      <p className="text-lg text-slate-600 mt-2">
        Ingresa el codigo que recibiste en tu correo
      </p>
      <ConfirmAccountForm />
    </>
  );
}
