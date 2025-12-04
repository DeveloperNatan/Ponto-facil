"use client";

import React, { useEffect, useState } from "react";
import {
  Clock,
  LogIn,
  LogOut,
  CheckCircle,
  TriangleAlert,
  CircleCheck,
  CirclePause,
} from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Point() {
  const [markingType, setMarkingType] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const { data: session } = useSession();
  const matriculaId = session?.user?.matriculaId;
  const ApiUrl = process.env.NEXT_PUBLIC_API as string;

  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (!sucess) return;
    const message = setInterval(() => {
      setSucess("");
    }, 2000);

    return () => clearInterval(message);
  }, [sucess]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!markingType) {
      setSucess("");
      setError("Selecione o tipo de marcação!");
      return;
    }

    try {
      await axios.post(`${ApiUrl}/api/markings`, {
        matriculaId: matriculaId,
        markingType,
      });

      setMarkingType("");
      setError("");
      setSucess("Seu ponto foi registrado!");
    } catch (err) {
      console.error(err);
      setError("Erro ao registar ponto");
    }
  }

  const formatTime = () =>
    currentTime.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const formatDate = () =>
    currentTime.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-emerald-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header com relógio */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6 text-center border-b-4 border-teal-600">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-8 h-8 text-black" />
            <h1 className="text-3xl font-bold text-black">Bater ponto</h1>
          </div>

          <div className="mt-4">
            <div className="text-5xl font-bold text-black mb-2">
              {formatTime()}
            </div>
            <div className="text-sm text-gray-600 capitalize">
              {formatDate()}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-b-2xl shadow-lg p-8"
        >
          {/* Tipo de Marcação */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Marcação
            </label>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setMarkingType("Entrada")}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                  markingType === "Entrada"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 hover:border-emerald-400 text-gray-600"
                }`}
              >
                <LogIn className="w-8 h-8 mb-2" />
                <span className="font-semibold">Entrada</span>
              </button>
              <button
                type="button"
                onClick={() => setMarkingType("Pausa")}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                  markingType === "Pausa"
                    ? "border-yellow-600 bg-yellow-50 text-yellow-700"
                    : "border-gray-200 hover:border-yellow-400 text-gray-600"
                }`}
              >
                <CirclePause className="w-8 h-8 mb-2" />
                <span className="font-semibold">Pausa</span>
              </button>
              <button
                type="button"
                onClick={() => setMarkingType("Saída")}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                  markingType === "Saída"
                    ? "border-red-600 bg-red-50 text-red-700"
                    : "border-gray-200 hover:border-red-400 text-gray-600"
                }`}
              >
                <LogOut className="w-8 h-8 mb-2" />
                <span className="font-semibold">Saída</span>
              </button>
            </div>
          </div>

          {/* Botão de envio */}
          <div className="w-full h-full flex justify-center">
            <button
              type="submit"
              className="w-40 h-40 cursor-pointer bg-linear-to-br from-teal-700 to-emerald-600 text-white font-semibold py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:brightness-110"
            >
              <CheckCircle className="w-5 h-5" />
              Registrar Ponto
            </button>
          </div>
          <div className="flex justify-center mt-6">
            {sucess && (
              <div className="flex items-center gap-3  rounded-xl px-4 py-3 shadow-sm">
                <CircleCheck className="text-green-700 w-6 h-6" />
                <p className="text-green-700 text-base font-medium">{sucess}</p>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-3 rounded-xl px-4 py-3 shadow-sm">
                <TriangleAlert className="text-red-600 w-6 h-6" />
                <p className="text-red-600 text-base font-medium">{error}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
