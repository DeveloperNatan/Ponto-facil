"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    email: "",
    senha: "",
    error: "",
    sucess: "",
  });

  const router = useRouter();
  async function CreateRegistry(e: React.FormEvent) {
    e.preventDefault();

    const { nome, cargo, email, senha } = formData;
    const ApiUrl = process.env.NEXT_PUBLIC_API_EMPLOYEES as string;

    if (!nome || !cargo || !email || !senha) {
      setFormData({ ...formData, error: "Todos os campos são obrigatórios. " });
      return;
    }

    try {
      await axios.post(ApiUrl, formData);
      setFormData({
        nome: "",
        cargo: "",
        email: "",
        senha: "",
        error: "",
        sucess:
          "Cadastro realizado com sucesso! Você será redirecionado em instantes para a página de login.",
      });

      router.push("/login");
    } catch (err) {
      let message;

      if (axios.isAxiosError(err)) {
        const BackError = err.response?.data.message;
        if (BackError) {
          message = BackError;
        }
      }

      setFormData({ ...formData, error: message });
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className=" flex justify-center">
            <UserPlus className="w-14 h-14 text-white bg-teal-400 p-1 rounded-xl" />
          </div>

          <h1 className="text-4xl font-bold text-gray-500 mb-2 mt-1">
            Criar conta
          </h1>

          <p className="text-gray-500 text-sm">
            Preencha os campos necessários
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 border border-teal-500">
          <form onSubmit={CreateRegistry} className="space-y-5 ">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nome completo
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="w-full px-4 py-3 border border-teal-200 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-colors"
                placeholder="Digite seu nome completo"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cargo
              </label>

              <input
                type="text"
                id="role"
                name="role"
                value={formData.cargo}
                onChange={(e) =>
                  setFormData({ ...formData, cargo: e.target.value })
                }
                className="w-full px-4 py-3 border border-teal-200 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-colors"
                placeholder="Digite seu cargo"
              />
            </div>

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
                placeholder="Crie uma senha forte"
              />
            </div>

            {formData.sucess && (
              <p className="text-green-500 text-sm text-center mt-1">
                {formData.sucess}
              </p>
            )}

            {formData.error && (
              <p className="text-red-500 text-sm text-center mt-1">
                {formData.error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-1"
            >
              Criar conta
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Já possui uma conta?{" "}
              <a
                href="/login"
                className="text-teal-500 hover:text-teal-600 font-medium transition-colors"
              >
                Entrar
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
