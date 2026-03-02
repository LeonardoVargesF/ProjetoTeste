"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Clientes } from "../../../interfaces/clienteInterface";
import { EyeIcon, UserIcon } from "@heroicons/react/24/solid";

export default function ViewCliente() {
  const { id } = useParams();
  const router = useRouter();
  const [cliente, setCliente] = useState<Clientes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCliente() {
      try {
        const response = await fetch(`https://localhost:5001/api/clientes/${id}`);

        if (!response.ok) {
          alert("Cliente não encontrado");
          router.push("/clientes");
          return;
        }

        const data = await response.json();
        setCliente(data);
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar cliente");
        router.push("/clientes");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCliente();
  }, [id, router]);

  const baseInput =
    "w-full px-4 py-2 rounded-xl bg-zinc-950/40 text-zinc-100 placeholder:text-zinc-500 transition outline-none border border-zinc-700";

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl">

        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/60 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-700 bg-linear-to-r from-zinc-700 via-zinc-900 to-zinc-700">
            <div className="text-zinc-100 font-semibold text-center">
              Dados do Cliente
            </div>

            <div className="text-zinc-100 text-center flex items-center">
              ID: <span className="text-white">{id ?? "-"}</span>
            </div>
          </div>

          <div className="p-8">
            {loading ? (
              <p className="text-zinc-300">Carregando...</p>
            ) : !cliente ? (
              <p className="text-zinc-300">Cliente não encontrado.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-zinc-200 mb-1">
                    Código
                  </label>
                  <input className={baseInput} type="text" value={cliente.codigo ?? ""} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-200 mb-1">
                    Nome
                  </label>
                  <input className={baseInput} type="text" value={cliente.nome ?? ""} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-200 mb-1">
                    Fantasia
                  </label>
                  <input className={baseInput} type="text" value={cliente.fantasia ?? ""} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-200 mb-1">
                    Documento
                  </label>
                  <input className={baseInput} type="text" value={cliente.documento ?? ""} disabled />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-200 mb-1">
                    Endereço
                  </label>
                  <input className={baseInput} type="text" value={cliente.endereco ?? ""} disabled />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 rounded-2xl text-blue-600 font-semibold
                           hover:bg-white/5 transition"
                  >
                    Voltar
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}