"use client";

import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Produtos } from "../../../interfaces/produtoCreateInterface";
import DecimalInput from "@/components/inputs/decimalInput";

export default function CadastroProduto() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Produtos>();

  const router = useRouter();
  const url = "https://localhost:5001/api/produtos";

  function parseDecimal(value: any) {
    if (value === null || value === undefined || value === "") return null;

    const s = String(value).trim();

    const normalized = s.includes(",")
      ? s.replace(/\./g, "").replace(",", ".")
      : s;

    const n = Number(normalized);
    return Number.isFinite(n) ? n : null;
  }

  const onSubmit = async (data: Produtos) => {
    try {
      const payload = {
        ...data,
        codigo: Number(data.codigo),
        valorVenda: parseDecimal(data.valorVenda) ?? 0,
        pesoBruto: parseDecimal(data.pesoBruto) ?? 0,
        pesoLiquido: parseDecimal(data.pesoLiquido) ?? 0,
      };

      console.log("Enviando dados:", payload);

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) { alert("Você precisa estar logado para realizar essa ação."); router.push("/login"); return; }


      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      reset();
      router.push("/produtos");
    } catch (error) {
      alert("Erro ao salvar produto.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/60 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-700 bg-linear-to-r from-zinc-700 via-zinc-900 to-zinc-700">
            <h2 className="text-zinc-100 font-semibold text-center">Dados do Produto</h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">Código</label>
              <input
                {...register("codigo", {
                  required: "Código é obrigatório",
                  valueAsNumber: true,
                  min: { value: 1, message: "Código deve ser maior que 0" },
                  max: {
                    value: 2147483647,
                    message: "Código máximo é 2147483647",
                  },
                })}
                className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                           placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60
                           focus:border-emerald-500/50 transition"
                type="text"
                inputMode="numeric"
                placeholder="Codigo"
              />
              {errors.codigo && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.codigo.message)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">Descrição</label>
              <input
                {...register("descricao", {
                  required: "Descrição é obrigatória",
                  maxLength: { value: 60, message: "Máximo de 60 caracteres" },
                })}
                className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                           placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60
                           focus:border-emerald-500/50 transition"
                type="text"
                placeholder="Descrição"
              />
              {errors.descricao && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.descricao.message)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">Código de barras</label>
              <input
                {...register("codBarras", {
                  required: "Código de barras é obrigatório",
                  maxLength: { value: 14, message: "Máximo de 14 caracteres" },
                })}
                className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                           placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60
                           focus:border-emerald-500/50 transition"
                type="text"
                placeholder="Código de barras"
              />
              {errors.codBarras && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.codBarras.message)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">Valor de venda</label>
              <Controller
                name="valorVenda"
                control={control}
                rules={{ required: "Valor de venda é obrigatório" }}
                render={({ field }) => (
                  <>
                    <DecimalInput
                      value={field.value || ""}
                      onChange={field.onChange}
                      decimals={2}
                      placeholder="0.00"
                      className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                                 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60
                                 focus:border-emerald-500/50 transition"
                    />
                    {errors.valorVenda && (
                      <p className="text-red-400 text-sm mt-1">
                        {String(errors.valorVenda.message)}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">Peso bruto (kg)</label>
              <Controller
                name="pesoBruto"
                control={control}
                rules={{ required: "Peso bruto é obrigatório" }}
                render={({ field }) => (
                  <>
                    <DecimalInput
                      value={field.value || ""}
                      onChange={field.onChange}
                      decimals={3}
                      placeholder="0.000"
                      className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                                 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60
                                 focus:border-emerald-500/50 transition"
                    />
                    {errors.pesoBruto && (
                      <p className="text-red-400 text-sm mt-1">
                        {String(errors.pesoBruto.message)}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">Peso líquido (kg)</label>
              <Controller
                name="pesoLiquido"
                control={control}
                rules={{ required: "Peso líquido é obrigatório" }}
                render={({ field }) => (
                  <>
                    <DecimalInput
                      value={field.value || ""}
                      onChange={field.onChange}
                      decimals={3}
                      placeholder="0.000"
                      className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                                 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60
                                 focus:border-emerald-500/50 transition"
                    />
                    {errors.pesoLiquido && (
                      <p className="text-red-400 text-sm mt-1">
                        {String(errors.pesoLiquido.message)}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-2xl text-emerald-600 font-semibold hover:bg-white/5 transition"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition disabled:opacity-50 shadow-lg shadow-emerald-600/20"
              >
                {isSubmitting ? "Salvando..." : "Criar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}