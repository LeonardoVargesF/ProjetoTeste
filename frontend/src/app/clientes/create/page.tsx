"use client";

import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Clientes } from "../../../interfaces/clienteCreateInterface";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { validarCPF } from "@/components/inputs/validarCPF";
import { validarCNPJ } from "@/components/inputs/validarCNPJ";

function onlyDigits(value: string) {
  return (value || "").replace(/\D/g, "");
}

function maskCPF(value: string) {
  const v = onlyDigits(value).slice(0, 11);
  return v
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

function maskCNPJ(value: string) {
  const v = onlyDigits(value).slice(0, 14);
  return v
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");
}

type DocumentoTipo = "CPF" | "CNPJ";

export default function CadastroCliente() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<Clientes>();

  const [docTipo, setDocTipo] = useState<DocumentoTipo>("CPF");

  const router = useRouter();
  const url = "https://localhost:5001/api/clientes";

  const onSubmit = async (data: Clientes) => {
    try {
      const payload = {
        ...data,
        codigo: Number(data.codigo),
        documento: onlyDigits(data.documento || ""),
      };

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) { alert("Você precisa estar logado para realizar essa ação."); router.push("/login"); return; }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro da API:", errorText);
        throw new Error(errorText);
      }

      alert("Cliente salvo com sucesso!");
      reset();
      router.push("/clientes");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar cliente.");
    }
  };

  function handleToggle(tipo: DocumentoTipo) {
    setDocTipo(tipo);
    setValue("documento", "");
    clearErrors("documento");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/60 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-700 bg-linear-to-r from-zinc-700 via-zinc-900 to-zinc-700">
            <h2 className="text-zinc-100 font-semibold text-center flex items-center justify-center gap-2">
              <div className="h-5 w-5" />
              Dados do Cliente
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">
                Código
              </label>
              <input
                {...register("codigo", {
                  valueAsNumber: true,
                  required: "Código é obrigatório",
                  min: { value: 1, message: "Código deve ser maior que 0" },
                  max: {
                    value: 2147483647,
                    message: "Código máximo é 2147483647",
                  },
                })}
                className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                           placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60
                           focus:border-blue-500/50 transition"
                type="text"
                inputMode="numeric"
                placeholder="Código"
              />
              {errors.codigo && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.codigo.message)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">
                Nome
              </label>
              <input
                {...register("nome", {
                  required: "Nome é obrigatório",
                  maxLength: { value: 60, message: "Máximo de 60 caracteres" },
                })}
                className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                           placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60
                           focus:border-blue-500/50 transition"
                type="text"
                placeholder="Nome completo"
              />
              {errors.nome && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.nome.message)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">
                Fantasia
              </label>
              <input
                {...register("fantasia", {
                  required: "Fantasia é obrigatória",
                  maxLength: { value: 100, message: "Máximo de 100 caracteres" },
                })}
                className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                           placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60
                           focus:border-blue-500/50 transition"
                type="text"
                placeholder="Nome fantasia"
              />
              {errors.fantasia && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.fantasia.message)}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-zinc-200">
                  Documento ({docTipo})
                </label>

                <div className="inline-flex rounded-xl border border-zinc-700 bg-zinc-950/30 p-1">
                  <button
                    type="button"
                    onClick={() => handleToggle("CPF")}
                    className={[
                      "px-3 py-1.5 text-sm rounded-lg transition",
                      docTipo === "CPF"
                        ? "bg-blue-600 text-white shadow"
                        : "text-zinc-200 hover:bg-white/5",
                    ].join(" ")}
                  >
                    CPF
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggle("CNPJ")}
                    className={[
                      "px-3 py-1.5 text-sm rounded-lg transition",
                      docTipo === "CNPJ"
                        ? "bg-blue-600 text-white shadow"
                        : "text-zinc-200 hover:bg-white/5",
                    ].join(" ")}
                  >
                    CNPJ
                  </button>
                </div>
              </div>

              <Controller
                name="documento"
                control={control}
                rules={{
                  required: `Documento é obrigatório`,
                  validate: (value) => {
                    const digits = onlyDigits(value || "");
                    if (docTipo === "CPF") {
                      if (digits.length !== 11) return "CPF deve ter 11 dígitos";
                      return validarCPF(value) || "CPF inválido";
                    }
                    if (digits.length !== 14) return "CNPJ deve ter 14 dígitos";
                    return validarCNPJ(value) || "CNPJ inválido";
                  },
                }}
                render={({ field }) => (
                  <>
                    <input
                      value={field.value || ""}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const masked = docTipo === "CPF" ? maskCPF(raw) : maskCNPJ(raw);
                        field.onChange(masked);
                      }}
                      className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                                 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60
                                 focus:border-blue-500/50 transition"
                      type="text"
                      inputMode="numeric"
                      placeholder={docTipo === "CPF" ? "000.000.000-00" : "00.000.000/0000-00"}
                      autoComplete="off"
                    />

                    {errors.documento && (
                      <p className="text-red-400 text-sm mt-1">
                        {String(errors.documento.message)}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-200 mb-1">
                Endereço
              </label>
              <input
                {...register("endereco", { required: "Endereço é obrigatório" })}
                className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                           placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60
                           focus:border-blue-500/50 transition"
                type="text"
                placeholder="Rua, número, bairro, cidade..."
              />
              {errors.endereco && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.endereco.message)}
                </p>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-2xl text-blue-600 font-semibold
                           hover:bg-white/5 transition"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-2xl bg-blue-600 text-white font-semibold
                           hover:bg-blue-500 transition disabled:opacity-50
                           shadow-lg shadow-blue-600/20"
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