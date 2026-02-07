import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

export default async function ChangePasswordPage() {
  return (
    <>
      <h1 className="font-black text-4xl text-slate-800 my-5">
        Cambiar Password
      </h1>
      <p className="text-xl font-bold text-slate-600">
        Aquí puedes cambiar tu {""}
        <span className="text-green-600">password</span>
      </p>

      <ChangePasswordForm />
    </>
  );
}
