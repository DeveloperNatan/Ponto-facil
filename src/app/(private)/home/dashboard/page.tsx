"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CalendarDays, Clock, History } from "lucide-react";

export default function Point() {
  const [error, setError] = useState("");
  const [data, setData] = useState<Marking[]>([]);
  const session = useSession();
  const user = session.data?.user.matriculaId;
  const ApiUrl = process.env.NEXT_PUBLIC_API_EMPLOYEES as string;

  useEffect(() => {
    if (!user) return;
  
    async function fetch() {
      try {
        const res = await axios.get(`${ApiUrl}${user}/markings`);
        setData(res.data);
      } catch {
        setError("Nenhuma marcação encontrada!");
      }
    }
    fetch();
  }, [user, ApiUrl]);

  const formatTime = (currentTime: Date) =>
    currentTime.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const formatDate = (currentTime: Date) =>
    currentTime.toLocaleDateString("pt-BR", {
      month: "numeric",
      day: "numeric",
    });

  function GenerateDates(dataBase: Date): string[] {
    // Pega o ano e o mês da data base
    const year = dataBase.getFullYear();
    const month = dataBase.getMonth();

    // Calcula quantos dias tem o mês
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Gera todas as datas do mês
    return Array.from({ length: daysInMonth }, (_, i) => {
      const data = new Date(year, month, i + 1);
      return data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });
    });
  }

  const now = new Date();
  const FirstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const Dias = GenerateDates(FirstDay);

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-white to-gray-50 p-8">
      {/* HEADER CENTRALIZADO */}
      <header className="text-center mb-10">
        <div className="flex flex-col items-center gap-2">
          <CalendarDays className="w-8 h-8 text-teal-600" />
          <h2 className="text-3xl font-bold text-gray-800">Minhas Marcações</h2>
          <h1 className="text-teal-700 text-lg capitalize">
            {now.toLocaleDateString("pt-BR", { month: "long" })}
          </h1>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <History className="w-4 h-4" />
            {error && (
              <div>
                <h1 className="text-red-600 text-base font-medium">{error}</h1>
              </div>
            )}
            <p>Histórico de pontos registrados</p>
          </div>
        </div>
      </header>

      {/* CONTEÚDO DAS MARCAÇÕES - ALINHADO À ESQUERDA */}
      <div className="w-full">
        <div className="space-y-8">
          {Dias.map((dia, index) => (
            <div
              key={index}
              className="flex items-start gap-2 border-b-2 rounded-lg p-4 border-gray-300 "
            >
              {/* Coluna da Data */}
              <div className="w-1/4 flex justify-start gap-2 ">
                <div>
                  <Clock className="w-5 h-5 text-teal-600" />
                </div>
                <h1 className="text-base sm:text-lg font-semibold text-gray-900">
                  {dia}
                </h1>
              </div>

              {/* Coluna dos Horários */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pr-4">
                {data
                  .filter((item) => {
                    const DataMakking = formatDate(new Date(item.timestamp));
                    return DataMakking === dia;
                  })
                  .map((item) => (
                    <div
                      key={item.pontoId}
                      className="bg-white border border-gray-100 hover:border-teal-200 transition-all rounded-2xl px-4 py-3 text-center shadow-sm hover:shadow-md"
                    >
                      <p className="text-sm text-gray-800 font-semibold">
                        {formatTime(new Date(item.timestamp))}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* RODAPÉ */}
        <footer className="mt-10 text-center">
          <p className="text-gray-800 font-medium">
            Total de marcações:{" "}
            <span className="font-bold text-teal-700">{data.length}</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
