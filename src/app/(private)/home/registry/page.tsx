"use client";

import React, { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle,
  TriangleAlert,
  CircleCheck,
  CirclePause,
} from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";


export default function Point() {
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const { data: session } = useSession();
  const matriculaId = session?.user?.matriculaId;
  const ApiUrl = process.env.NEXT_PUBLIC_API_MARKINGS as string;

  useState(() => {
    setCurrentTime(new Date());

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



    try {
      await axios.post(ApiUrl, {
        matriculaId: matriculaId,
      });

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
    })

  const formatDate = () =>
     currentTime.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

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
