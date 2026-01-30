import AdminMenu from "@/components/admin/AdminMenu";
import { Logo } from "@/components/ui/Logo";
import { ToastNotification } from "@/components/ui/ToastNotification";
import { verifySession } from "@/src/auth/dal";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifySession();
  return (
    <>
      <header className="bg-slate-900 py-5">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Link href={"/admin"}>
              <Logo />
            </Link>
          </div>

          <AdminMenu user={user} />
        </div>
      </header>
      <main className="max-w-5xl mx-auto mt-10 p-3">
        {children}
      </main>
      <ToastNotification />

      <footer className="py-5">
        <p className="text-center text-slate-600 mt-10">
          Walletrack - Todos los Derechos Reservados {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
