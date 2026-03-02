"use client";

import { useEffect, useState } from "react";
import {
  PencilIcon,
  EyeIcon,
  ArchiveBoxXMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Clientes } from "../../interfaces/clienteInterface";

export default function VisualizarClientes() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:5001/api/clientes/")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar clientes");
        return response.json();
      })
      .then((data) => {
        setClientes(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao carregar clientes");
      })
      .finally(() => setLoading(false));
  }, []);

  function handleEdit(cliente: Clientes) {
    router.push(`/clientes/${cliente.id}/edit`);
  }

  function handleView(cliente: Clientes) {
    router.push(`/clientes/${cliente.id}`);
  }

  async function handleDelete(id: number) {
    const confirmar = confirm("Deseja realmente excluir este cliente?");
    if (!confirmar) return;

    try {
      const response = await fetch(`https://localhost:5001/api/clientes/${id}`, {
        credentials: "include",
        method: "DELETE",
      });

      if (response.status === 401) { alert("Você precisa estar logado para realizar essa ação."); router.push("/login"); return; }

      if (!response.ok) throw new Error("Erro ao excluir cliente");

      alert("cliente excluido com sucesso!");

      setClientes((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir cliente");
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">

        </div>

        <div className=" border border-zinc-700 bg-zinc-900/60 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-700 flex items-center justify-between">
            <span className="text-zinc-200 font-semibold">
              {loading ? "Carregando..." : `${clientes.length} clientes`}
            </span>

            <div className="text-zinc-400 text-sm">
              {loading ? "Buscando dados da API" : "Atualizado agora"}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="uppercase text-xs text-zinc-200">
                <tr className="bg-linear-to-r from-zinc-700 via-zinc-900 to-zinc-700">
                  <th className="px-4 py-4 text-center">Id</th>
                  <th className="px-4 py-4 text-center">Código</th>
                  <th className="px-4 py-4">Nome</th>
                  <th className="px-4 py-4">Fantasia</th>
                  <th className="px-4 py-4">CPF</th>
                  <th className="px-4 py-4">Endereço</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-zinc-300"
                    >
                      Carregando clientes...
                    </td>
                  </tr>
                ) : clientes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-zinc-300"
                    >
                      Nenhum cliente encontrado.
                    </td>
                  </tr>
                ) : (
                  clientes.map((cliente) => (
                    <tr
                      key={cliente.id}
                      className="border-t border-zinc-800 text-zinc-100 hover:bg-white/5 transition"
                    >
                      <td className="px-4 py-4 text-center text-zinc-300">
                        {cliente.id}
                      </td>
                      <td className="px-4 py-4 text-center font-semibold">
                        {cliente.codigo}
                      </td>
                      <td className="px-4 py-4 text-center">{cliente.nome}</td>
                      <td className="px-4 py-4 text-center text-zinc-300">
                        {cliente.fantasia}
                      </td>
                      <td className="px-4 py-4 text-center">{cliente.documento}</td>
                      <td className="px-4 py-4 text-center text-zinc-300">
                        {cliente.endereco}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleView(cliente)}
                            className="p-2 rounded-xl bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 transition"
                            title="Ver"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => handleEdit(cliente)}
                            className="p-2 rounded-xl bg-amber-600/10 text-amber-400 hover:bg-amber-600/20 transition"
                            title="Editar"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => handleDelete(cliente.id)}
                            className="p-2 rounded-xl bg-red-600/10 text-red-400 hover:bg-red-600/20 transition"
                            title="Excluir"
                          >
                            <ArchiveBoxXMarkIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-2 border-t border-zinc-700 text-zinc-400 text-sm">
            <div className="flex items-center justify-end h-full w-full px-4 mb-4 mt-4"><button
              type="button"
              onClick={() => router.push("/clientes/create")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-3xl bg-blue-600 text-white font-semibold
                       hover:bg-blue-500 transition shadow-lg shadow-blue-600/20"
            >
              <PlusIcon className="w-5 h-5" />
              Novo cliente
            </button></div>

          </div>
        </div>
      </div>
    </div>
  );
}