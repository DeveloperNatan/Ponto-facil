"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function App() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    error: "",
  });
  const router = useRouter();

  async function FetchData(e: React.FormEvent) {
    e.preventDefault();
    const { email, senha } = formData;
    if (!email || !senha) {
      setFormData({ ...formData, error: "Preencha todos os campos!" });
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password: senha,
    });
    if (res?.ok) {
      setFormData({ email: "", senha: "", error: "" });
      router.push("/home");
    } else {
      setFormData({ ...formData, error: "Email ou senha inválidos!" });
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Lado esquerdo: imagem + overlay teal */}
      <div className="relative w-2/3 h-screen overflow-hidden">
        <Image
          src="/assets/imagemorg.jpg"
          alt="Imagem organizacional"
          fill
          className="object-cover"
        />
        {/* <div className="absolute inset-0 bg-teal-500/40" /> */}
      </div>

      <div className="w-1/3 h-screen bg-white flex items-center justify-center">
        <div className="w-full max-w-sm px-8">
          <div className=" flex justify-center py-2 px-2">
            <Image
              src="/assets/logonew.png"
              width={100}
              height={100}
              alt="logo"
              className="rounded"
            />
          </div>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">
              Acesse sua conta
            </h1>
            <p className="text-gray-500 text-sm">
              Informe seu email e senha para continuar
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={FetchData} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm"
                placeholder="usuario@dominio.com.br"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.senha}
                onChange={(e) =>
                  setFormData({ ...formData, senha: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm"
                placeholder="Digite sua senha"
              />
            </div>

            {formData.error && (
              <p className="text-red-500 text-xs mt-1">{formData.error}</p>
            )}

            <button
              type="submit"
              className="w-full cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-medium py-2.5 rounded-md text-sm transition-colors"
            >
              Entrar
            </button>
          </form>

          {/* Link de criar conta / extra */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Ainda não tem uma conta?{" "}
              <a
                href="/sign-in"
                className="text-teal-500 hover:text-teal-600 font-medium"
              >
                Criar
              </a>
            </p>
          </div>

          {/* Rodapé pequeno na coluna */}
          <div className="mt-8 text-center text-[11px] text-gray-400">
            © 2025 Ponto fácil. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}
