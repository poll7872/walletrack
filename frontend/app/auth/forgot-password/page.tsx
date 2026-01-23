import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Walletrack | Recuperar Contraseña",
  description: "Recuperar Contraseña en Walletrack",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-4xl font-black text-slate-800">
        Recuperar Contraseña
      </h1>
      <p className="text-lg text-slate-600 mt-2">
        Te enviaremos un email con las instrucciones
      </p>

      <ForgotPasswordForm />

      <nav className="mt-8 text-center text-sm">
        <p className="text-slate-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/login" className="font-bold text-green-600 hover:text-green-700">
                Iniciar Sesión
            </Link>
        </p>
      </nav>
    </>
  );
}
