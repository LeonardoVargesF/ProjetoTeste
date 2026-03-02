"use client";

import { useEffect, useState } from "react";
import {
  PencilIcon,
  EyeIcon,
  ArchiveBoxXMarkIcon,
  PlusIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Produtos } from "../../interfaces/produtoInterface";

export default function VisualizarProdutos() {
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produtos[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:5001/api/produtos/")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        return response.json();
      })
      .then((data) => {
        console.log("DADOS DA API:", data);
        setProdutos(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao carregar produtos");
      })
      .finally(() => setLoading(false));
  }, []);

  function handleEdit(produto: Produtos) {
    router.push(`/produtos/${produto.id}/edit`);
  }

  function handleView(produto: Produtos) {
    router.push(`/produtos/${produto.id}`);
  }

  async function handleDelete(id: number) {
    const confirmar = confirm("Deseja realmente excluir este produto?");
    if (!confirmar) return;

    try {
      const response = await fetch(`https://localhost:5001/api/produtos/${id}`, {
        credentials: "include",
        method: "DELETE",
      });

      if (response.status === 401) { alert("Você precisa estar logado para realizar essa ação."); router.push("/login"); return; }

      if (!response.ok) throw new Error("Erro ao excluir produto");

      alert("Produto excluido com sucesso!");

      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir produto");
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-start gap-3">

            <div>
            </div>
          </div>

        </div>

        <div className="border border-zinc-700 bg-zinc-900/60 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-700 flex items-center justify-between">
            <span className="text-zinc-200 font-semibold">
              {loading ? "Carregando..." : `${produtos.length} produtos`}
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
                  <th className="px-4 py-4 text-center">Descrição</th>
                  <th className="px-4 py-4 text-center">Código de barras</th>
                  <th className="px-4 py-4 text-center">Valor de venda</th>
                  <th className="px-4 py-4 text-center">Peso bruto</th>
                  <th className="px-4 py-4 text-center">Peso líquido</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-10 text-center text-zinc-300"
                    >
                      Carregando produtos...
                    </td>
                  </tr>
                ) : produtos.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-10 text-center text-zinc-300"
                    >
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                ) : (
                  produtos.map((produto) => (
                    <tr
                      key={produto.id}
                      className="border-t border-zinc-800 text-zinc-100 hover:bg-white/5 transition"
                    >
                      <td className="px-4 py-4 text-center text-zinc-300">
                        {produto.id}
                      </td>
                      <td className="px-4 py-4 text-center font-semibold">
                        {produto.codigo}
                      </td>
                      <td className="px-4 py-4 text-center">{produto.descricao}</td>
                      <td className="px-4 py-4 text-center text-zinc-300">
                        {produto.codBarras}
                      </td>
                      <td className="px-4 py-4 text-center font-mono">
                        {produto.valorVenda}
                      </td>
                      <td className="px-4 py-4 text-center">{produto.pesoBruto}</td>
                      <td className="px-4 py-4 text-center">{produto.pesoLiquido}</td>

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleView(produto)}
                            className="p-2 rounded-xl bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 transition"
                            title="Ver"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => handleEdit(produto)}
                            className="p-2 rounded-xl bg-amber-600/10 text-amber-400 hover:bg-amber-600/20 transition"
                            title="Editar"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => handleDelete(produto.id)}
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

          <div className="px-6 py-2 border-t border-zinc-700 text-zinc-400 text-sm">
            <div className="flex items-center justify-end h-full w-full px-4 mb-4 mt-4">
              <button
                type="button"
                onClick={() => router.push("/produtos/create")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-3xl bg-emerald-600 text-white font-semibold
                       hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20"
              >
                <PlusIcon className="w-5 h-5" />
                Novo produto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}