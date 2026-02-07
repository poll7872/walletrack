import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-500/30 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-[140px]" />
        <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-slate-700/50 blur-[120px]" />
      </div>

      <header className="border-b border-slate-800/70 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-6 lg:flex-row lg:justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80 lg:block">
              Finanzas claras
            </span>
          </div>
          <nav className="flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/auth/login"
              className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-emerald-400"
            >
              Crear Cuenta
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-16 lg:pt-24">
        <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
              Tu centro financiero
            </p>
            <h1 className="text-4xl font-black leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Diseña tu futuro financiero con{" "}
              <span className="text-emerald-300">Walletrack</span>
            </h1>
            <p className="text-lg text-slate-300">
              Organiza ingresos, controla egresos y sigue cada meta en un solo
              panel. Una experiencia elegante, rápida y creada para convertir
              tus decisiones en resultados reales.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/register"
                className="rounded-full bg-emerald-500 px-8 py-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-emerald-400"
              >
                Empezar Gratis
              </Link>
              <Link
                href="/auth/login"
                className="rounded-full border border-slate-700 px-8 py-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
              >
                Ver Dashboard
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Sin tarjetas ni compromiso
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Configuración en 3 minutos
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-slate-900/60 to-transparent blur-2xl" />
            <div className="relative space-y-6 rounded-3xl border border-slate-800/70 bg-slate-900/80 p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Balance total
                  </p>
                  <p className="text-3xl font-black text-emerald-300">
                    $24,580.90
                  </p>
                </div>
                <span className="rounded-full border border-emerald-400/50 px-3 py-1 text-xs font-semibold text-emerald-200">
                  +18% este mes
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Ingresos</span>
                  <span className="font-semibold text-slate-50">$8,920</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 w-3/4 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Gastos</span>
                  <span className="font-semibold text-slate-50">$3,150</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 w-1/3 rounded-full bg-cyan-400" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs text-slate-300">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-slate-500">Objetivos</p>
                  <p className="text-lg font-semibold text-slate-100">6</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-slate-500">Categorías</p>
                  <p className="text-lg font-semibold text-slate-100">14</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-slate-500">Alertas</p>
                  <p className="text-lg font-semibold text-slate-100">3</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          {[
            {
              title: "Visión estratégica",
              desc: "Tableros claros con métricas clave para decidir rápido y con confianza.",
            },
            {
              title: "Presupuestos vivos",
              desc: "Ajusta metas en tiempo real y recibe alertas cuando algo se sale de plan.",
            },
            {
              title: "Seguridad total",
              desc: "Tus datos están protegidos con estándares modernos y control granular.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-800/60 bg-slate-900/70 p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-slate-50">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-slate-300">{feature.desc}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-800/70 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 lg:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
                Empieza hoy
              </p>
              <h2 className="text-3xl font-black text-slate-50">
                Convierte cada gasto en una decisión inteligente
              </h2>
              <p className="text-sm text-slate-300">
                Configura tus metas, conecta tus categorías y siente el control
                desde el primer día.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/register"
                className="rounded-full bg-emerald-500 px-8 py-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-emerald-400"
              >
                Crear Cuenta
              </Link>
              <Link
                href="/auth/login"
                className="rounded-full border border-slate-700 px-8 py-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/70 pb-10 pt-6 text-sm text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p>Walletrack © {new Date().getFullYear()}</p>
          <div className="flex flex-col gap-2 text-center sm:flex-row sm:gap-6">
            <Link
              href="/auth/register"
              className="font-semibold text-slate-300 transition hover:text-emerald-300"
            >
              ¿No tienes cuenta? Crea una
            </Link>
            <Link
              href="/auth/login"
              className="font-semibold text-slate-300 transition hover:text-emerald-300"
            >
              ¿Ya tienes cuenta? Iniciar Sesión
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
