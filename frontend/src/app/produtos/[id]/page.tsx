"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Produtos } from "../../../interfaces/produtoInterface";
import { EyeIcon, CubeIcon } from "@heroicons/react/24/solid";

export default function ViewProduto() {
  const { id } = useParams();
  const router = useRouter();
  const [produto, setProduto] = useState<Produtos | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await fetch(`https://localhost:5001/api/produtos/${id}`);

        if (!response.ok) {
          alert("Produto não encontrado");
          router.push("/produtos");
          return;
        }

        const data = await response.json();
        setProduto(data);
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar produto");
        router.push("/produtos");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduto();
  }, [id, router]);

  const baseInput =
    "w-full px-4 py-2 rounded-xl bg-zinc-950/40 text-zinc-100 placeholder:text-zinc-500 transition outline-none border border-zinc-700";

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="flex items-start gap-3 mb-8">
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/60 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-700 bg-linear-to-r from-zinc-700 via-zinc-900 to-zinc-700">
            <div className="text-zinc-100 font-semibold text-center">
              Dados do Produto
            </div>

            <div className="text-zinc-100 text-center flex items-center">
              ID: <span className="text-zinc-100">{id ?? "-"}</span>
            </div>
          </div>

          <div className="p-8">
            {loading ? (
              <p className="text-zinc-300">Carregando...</p>
            ) : !produto ? (
              <p className="text-zinc-300">Produto não encontrado.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-200 mb-1">
                    Código
                  </label>
                  <input className={baseInput} type="text" value={produto.codigo ?? ""} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-200 mb-1">
                    Descrição
                  </label>
                  <input className={baseInput} type="text" value={produto.descricao ?? ""} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-200 mb-1">
                    Código de barras
                  </label>
                  <input className={baseInput} type="text" value={produto.codBarras ?? ""} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-200 mb-1">
                    Valor de venda
                  </label>
                  <input className={baseInput} type="text" value={String(produto.valorVenda ?? "")} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-200 mb-1">
                    Peso bruto
                  </label>
                  <input className={baseInput} type="text" value={String(produto.pesoBruto ?? "")} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-200 mb-1">
                    Peso líquido
                  </label>
                  <input className={baseInput} type="text" value={String(produto.pesoLiquido ?? "")} disabled />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 rounded-2xl text-emerald-600 font-semibold
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