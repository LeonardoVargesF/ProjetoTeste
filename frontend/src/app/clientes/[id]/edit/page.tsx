"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Clientes } from "../../../../interfaces/clienteInterface";
import { validarCPF } from "@/components/inputs/validarCPF";
import { validarCNPJ } from "@/components/inputs/validarCNPJ";
import { PencilIcon } from "@heroicons/react/24/solid";

type DocumentoTipo = "CPF" | "CNPJ";

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

export default function EditarCliente() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [docTipo, setDocTipo] = useState<DocumentoTipo>("CPF");

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<Clientes>({
    defaultValues: {
      codigo: 0,
      nome: "",
      fantasia: "",
      documento: "",
      endereco: "",
    },
  });

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

        const digits = onlyDigits(data.documento ?? "");
        const tipo: DocumentoTipo = digits.length > 11 ? "CNPJ" : "CPF";

        setDocTipo(tipo);

        reset({
          ...data,
          documento: tipo === "CNPJ" ? maskCNPJ(digits) : maskCPF(digits),
        });
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar cliente");
        router.push("/clientes");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCliente();
  }, [id, router, reset]);

  function handleToggle(tipo: DocumentoTipo) {
    setDocTipo(tipo);
    setValue("documento", "");
    clearErrors("documento");
  }

  const onSubmit = async (data: Clientes) => {
    try {
      const payload = {
        ...data,
        codigo: Number((data as any).codigo),
        documento: onlyDigits(data.documento ?? ""),
      };

      const response = await fetch(`https://localhost:5001/api/clientes/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) { alert("Você precisa estar logado para realizar essa ação."); router.push("/login"); return; }

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        console.error("Erro PUT:", response.status, text);
        alert("Erro ao atualizar cliente");
        return;
      }

      alert("Cliente atualizado com sucesso!");
      router.push("/clientes");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar cliente");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-6 py-10 flex items-center justify-center">
        <p className="text-zinc-300">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/60 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-700 bg-linear-to-r from-zinc-700 via-zinc-900 to-zinc-700">
            <div className="text-zinc-100 font-semibold text-center">
              Editar Cliente
            </div>

            <div className="text-zinc-100 text-center flex items-center">
              ID: <span className="text-white">{id ?? "-"}</span>
            </div>
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
                  max: { value: 2147483647, message: "Código máximo é 2147483647" },
                })}
                type="number"
                inputMode="numeric"
                placeholder="Ex: 123"
                className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                           placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60
                           focus:border-blue-500/50 transition"
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
                type="text"
                placeholder="Nome"
                className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                           placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60
                           focus:border-blue-500/50 transition"
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
                type="text"
                placeholder="Fantasia"
                className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                           placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60
                           focus:border-blue-500/50 transition"
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
                  required: "Documento é obrigatório",
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
                type="text"
                placeholder="Endereço"
                className="w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100
                           placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60
                           focus:border-blue-500/50 transition"
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
                className="px-6 py-2 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition disabled:opacity-50 shadow-lg shadow-blue-600/20"
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}