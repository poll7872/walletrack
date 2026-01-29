import { PasswordResetHandler } from "@/components/auth/PasswordResetHandler";

export default function NewPaswordPage() {
  return (
    <>
      <h1 className="text-4xl font-black text-slate-800">
        Reestablecer Contraseña
      </h1>
      <p className="text-lg text-slate-600 mt-2">
        Ingresa el código que recibiste por email
      </p>
      <PasswordResetHandler />
    </>
  );
}
