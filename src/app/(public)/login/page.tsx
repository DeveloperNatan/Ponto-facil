"use client";

import React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

export default function SignIn() {
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
      email: formData.email,
      password: formData.senha,
    });

    if (res?.ok) {
      setFormData({
        email: "",
        senha: "",
        error: "",
      });
      router.push("/home");
    } else {
      setFormData({ ...formData, error: "Email ou senha invaidos!" });
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <div className=" flex justify-center">
            <User className="w-14 h-14 text-white bg-teal-400 p-1 rounded-xl" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2 mt-1">
            Login
          </h1>
          <div className="py-2 px-2">
            <p className="text-gray-500 text-sm">
              Preencha os campos necessários
            </p>
            <p className="text-red-500 text-sm mt-2">Você está desconectado!</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-8 border border-teal-500">
          <form onSubmit={FetchData}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
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
                className="w-full px-4 py-3 border border-teal-200 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-colors"
                placeholder="voce@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                value={formData.senha}
                onChange={(e) =>
                  setFormData({ ...formData, senha: e.target.value })
                }
                className="w-full px-4 py-3 border border-teal-200 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-colors"
                placeholder="Digite sua senha"
              />
            </div>

            {formData.error && (
              <p className="text-red-500 text-sm mt-3">{formData.error}</p>
            )}

            <button
              type="submit"
              className="w-full cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-3"
            >
              Entrar
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Ainda não tem uma conta?{" "}
              <a
                href="/sign-in"
                className="text-teal-500 hover:text-teal-600 font-medium transition-colors"
              >
                Criar
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
