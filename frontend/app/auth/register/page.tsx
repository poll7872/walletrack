import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Walletrack | Crear Cuenta",
  description: "Registrar una cuenta en Walletrack",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-4xl font-black text-slate-800">Crear una cuenta</h1>
      <p className="text-lg text-slate-600 mt-2">
        Únete para empezar a administrar tu dinero
      </p>

      <RegisterForm />

      <nav className="mt-8 text-center text-sm">
        <p className="text-slate-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-green-600 hover:text-green-700"
          >
            Iniciar Sesión
          </Link>
        </p>
      </nav>
    </>
  );
}
