"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center px-6">
      <div className="flex flex-col md:flex-row gap-10">
        <button
          onClick={() => router.push("/clientes")}
          className="w-64 h-64 rounded-2xl bg-blue-600 text-white text-2xl font-bold hover:bg-blue-500 transition-all duration-300 shadow-2xl shadow-blue-600/30 hover:scale-105"
        >
          CLIENTES
        </button>

        <button
          onClick={() => router.push("/produtos")}
          className="w-64 h-64 rounded-2xl bg-emerald-600 text-white text-2xl font-bold hover:bg-emerald-500 transition-all duration-300 shadow-2xl shadow-emerald-600/30 hover:scale-105"
        >
          PRODUTOS
        </button>
      </div>
    </div>
  );
}