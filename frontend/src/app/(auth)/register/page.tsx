"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { User } from "../../../interfaces/userInterface";
import {
  EyeIcon,
  EyeSlashIcon,
  UserPlusIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";

type RegisterForm = User & {
  confirmPassword: string;
};

function getPasswordRules(password: string) {
  return {
    minLength: password.length >= 6,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasDigit: /\d/.test(password),
    hasSymbol: /[^A-Za-z0-9]/.test(password),
  };
}

export default function CadastroProduto() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<RegisterForm>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const router = useRouter();
  const url = "https://localhost:5001/api/auth/register";

  const password = watch("password") ?? "";
  const passwordValue = watch("password");
  const rules = getPasswordRules(password);
  const strongPassword = Object.values(rules).every(Boolean);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const onSubmit = async (data: RegisterForm) => {
    try {
      const { confirmPassword, ...payload } = data;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("Cadastro realizado com sucesso!");
      reset();
      router.push("/");
    } catch (error: any) {
      console.error("Erro ao salvar:", error);
      alert(error.message);
    }
  };

  const inputBase =
    "w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/50 transition";

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/60 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-700 bg-linear-to-r from-zinc-700 via-zinc-900 to-zinc-700">
            <h2 className="text-zinc-100 font-semibold text-center">
              Dados da Conta
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">
                Primeiro nome
              </label>
              <input
                {...register("firstName", {
                  required: "Primeiro nome é obrigatório",
                  maxLength: { value: 60, message: "Máximo de 60 caracteres" },
                })}
                type="text"
                className={inputBase}
                placeholder="Primeiro nome"
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.firstName.message)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">
                Sobrenome
              </label>
              <input
                {...register("lastName", {
                  required: "Sobrenome é obrigatório",
                  maxLength: { value: 60, message: "Máximo de 60 caracteres" },
                })}
                type="text"
                className={inputBase}
                placeholder="Sobrenome"
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.lastName.message)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">
                Nome de usuário
              </label>
              <input
                {...register("userName", {
                  required: "Nome de usuário é obrigatório",
                  maxLength: { value: 60, message: "Máximo de 60 caracteres" },
                  validate: (v) =>
                    !/\s/.test(v || "") || "Não pode conter espaços",
                })}
                onKeyDown={(e) => {
                  if (e.key === " ") e.preventDefault();
                }}
                type="text"
                className={inputBase}
                placeholder="Nome de usuário"
              />
              {errors.userName && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.userName.message)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email é obrigatório",
                  maxLength: { value: 120, message: "Máximo de 120 caracteres" },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email inválido",
                  },
                })}
                type="email"
                className={inputBase}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">
                Senha
              </label>

              <div className="relative">
                <input
                  {...register("password", {
                    required: "Senha é obrigatória",
                    maxLength: { value: 60, message: "Máximo de 60 caracteres" },
                    validate: (v) =>
                      Object.values(getPasswordRules(v || "")).every(Boolean) ||
                      "Senha fraca",
                  })}
                  type={showPassword ? "text" : "password"}
                  className={`${inputBase} pr-12`}
                  placeholder="Senha"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-3 flex items-center text-zinc-300 hover:text-white transition"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">
                Confirme a senha
              </label>

              <div className="relative">
                <input
                  {...register("confirmPassword", {
                    required: "Confirme a senha",
                    validate: (value) =>
                      value === passwordValue || "As senhas não coincidem",
                  })}
                  type={showPassword2 ? "text" : "password"}
                  className={`${inputBase} pr-12`}
                  placeholder="Confirme a senha"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword2((s) => !s)}
                  className="absolute inset-y-0 right-3 flex items-center text-zinc-300 hover:text-white transition"
                  aria-label={
                    showPassword2 ? "Ocultar confirmação" : "Mostrar confirmação"
                  }
                >
                  {showPassword2 ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.confirmPassword.message)}
                </p>
              )}
            </div>

            <div className="md:col-span-2 rounded-2xl border border-zinc-700 bg-zinc-950/30 p-4">
              <p className="text-zinc-200 text-sm font-medium mb-2">
                Requisitos da senha
              </p>
              <ul className="text-sm space-y-1">
                <li className={rules.minLength ? "text-emerald-400" : "text-red-400"}>
                  • Mínimo 6 caracteres
                </li>
                <li className={rules.hasUpper ? "text-emerald-400" : "text-red-400"}>
                  • 1 letra maiúscula
                </li>
                <li className={rules.hasLower ? "text-emerald-400" : "text-red-400"}>
                  • 1 letra minúscula
                </li>
                <li className={rules.hasDigit ? "text-emerald-400" : "text-red-400"}>
                  • 1 número
                </li>
                <li className={rules.hasSymbol ? "text-emerald-400" : "text-red-400"}>
                  • 1 símbolo (ex: !@#)
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-2xl text-blue-600 font-semibold hover:bg-white/5 transition inline-flex items-center gap-2"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !strongPassword}
                className="px-6 py-2 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition disabled:opacity-50 shadow-lg shadow-blue-600/20"
              >
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}