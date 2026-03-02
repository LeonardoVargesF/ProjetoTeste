"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Auth } from "../../../interfaces/authInterface";
import { EyeIcon, EyeSlashIcon, ArrowRightIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/contexts/authContext";

export default function CadastroCliente() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Auth>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { setAuthenticated } = useAuth();
  const router = useRouter();
  const url = "https://localhost:5001/api/auth/login";

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("https://localhost:5001/api/auth/me", {
          credentials: "include",
        });

        if (response.ok) {
          router.push("/");
        }
      } catch {}
    }

    checkAuth();
  }, [router]);

  const onSubmit = async (data: Auth) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });



      if (!res.ok) {
        alert("Email ou senha inválidos");
        const errorText = await res.text();
        console.error("Erro da API:", errorText);
        throw new Error(errorText);
      }

      alert("Bem vindo!");
      reset();
      setAuthenticated(true);
      router.push("/");
    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Erro ao logar.");
    }
  };

  const inputBase =
    "w-full px-4 py-2 border border-zinc-700 rounded-xl bg-zinc-950/40 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/50 transition";

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-md">

        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/60 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-700 bg-linear-to-r from-zinc-700 via-zinc-900 to-zinc-700">
            <h2 className="text-zinc-100 font-semibold text-center">Login</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">Email</label>
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
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{String(errors.email.message)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-200 mb-1">Senha</label>

              <div className="relative">
                <input
                  {...register("password", {
                    required: "Senha é obrigatória",
                    maxLength: { value: 60, message: "Máximo de 60 caracteres" },
                  })}
                  type={showPassword ? "text" : "password"}
                  className={`${inputBase} pr-12`}
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-3 flex items-center text-zinc-300 hover:text-white transition"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{String(errors.password.message)}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="px-6 py-2 rounded-2xl text-blue-600 font-semibold hover:bg-white/5 transition inline-flex items-center gap-2"
              >
                
                Criar Conta
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition disabled:opacity-50 shadow-lg shadow-blue-600/20 inline-flex items-center gap-2"
              >

                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}