import { Logo } from "@/components/ui/Logo";
import { ToastNotification } from "@/components/ui/ToastNotification";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2 lg:h-screen">
        <div className="bg-slate-900 flex flex-col justify-center items-center p-5 lg:h-screen">
          <Link href={"/"}>
            <Logo />
          </Link>
          <p className="text-white mt-2 text-center text-lg">
            Toma el control de tus finanzas personales.
          </p>
        </div>
        <div className="p-10 lg:py-28 flex flex-col justify-center lg:h-screen lg:overflow-y-auto">
          <div className="max-w-md mx-auto w-full">{children}</div>
        </div>
      </div>

      <ToastNotification />
    </>
  );
}
