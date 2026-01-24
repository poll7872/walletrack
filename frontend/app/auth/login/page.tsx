import { LoginForm } from "@/components/auth/LoginForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Walletrack | Iniciar Sesión",
  description: "Iniciar Sesión en Walletrack",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="text-4xl font-black text-slate-800">Iniciar sesión</h1>
      <p className="text-lg text-slate-600 mt-2">
        Ingresa tus credenciales para continuar
      </p>

      <LoginForm />

      <nav className="mt-8 text-center text-sm">
        <p className="text-slate-600">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/auth/register"
            className="font-bold text-green-600 hover:text-green-700"
          >
            Crear una
          </Link>
        </p>
      </nav>
    </>
  );
}
