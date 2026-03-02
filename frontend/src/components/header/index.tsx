"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";

export function Header() {
  const router = useRouter();
  const { isAuthenticated, setAuthenticated } = useAuth();

  const handleLogout = async () => {
    await fetch("https://localhost:5001/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    alert("Usuário desconectado!");
    setAuthenticated(false);
    router.push("/login");
  };

  return (
    <header className="h-12 w-full fixed top-0 z-50 bg-linear-to-r from-zinc-800 to-zinc-900 shadow-lg">
      <div className="flex items-center justify-between h-full w-full px-4">
        <div className="flex items-center gap-12">
          <a className="max-h-16 text-white pr-10">PROJETO TESTE</a>

          <nav className="absolute left-1/2 -translate-x-1/2 flex gap-6 uppercase text-sm font-semibold text-white">
            <Link href="/clientes" className="hover:text-blue-600 transition">Cliente</Link>
            <Link href="/" className="hover:text-zinc-500 transition">Home</Link>
            <Link href="/produtos" className="hover:text-emerald-600 transition">Produto</Link>
          </nav>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="bg-zinc-700 hover:bg-red-500 transition px-4 py-2 rounded-4xl"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="bg-zinc-700 hover:bg-blue-500 transition px-4 py-2 rounded-4xl"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}