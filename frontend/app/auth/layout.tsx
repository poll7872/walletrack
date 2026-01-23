import { Logo } from "@/components/ui/Logo";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
        <div className="bg-slate-900 flex flex-col justify-center items-center p-10">
          <Logo />
          <p className="text-white mt-8 text-center text-lg">
            Toma el control de tus finanzas personales.
          </p>
        </div>
        <div className="p-10 lg:py-28 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
