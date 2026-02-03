import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-5">
      <h1 className="font-black text-4xl text-slate-800">No Encontrado</h1>
      <p className="text-xl font-bold text-slate-600">
        El Presupuesto que intentas acceder {""}{" "}
        <span className="text-green-600">no existe</span>
      </p>
      <Link
        href="/admin"
        className="bg-green-600 px-10 py-3 rounded-lg text-white font-bold cursor-pointer"
      >
        Ir a Presupuestos
      </Link>
    </div>
  );
}
