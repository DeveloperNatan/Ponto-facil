"use client";


import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Profile() {
  const session = useSession();
  const user = session.data?.user.name;

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-medium text-zinc-500">{user}</p>

        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">
          Página em manutenção
        </h1>

        <p className="mt-2 text-sm text-zinc-600">
          Esta área está passando por ajustes e ficará disponível em breve.
        </p>

        <div className="mt-5 flex items-center justify-center gap-3">
          <Link href="/home" className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
            Voltar para o início
          </Link>
        </div>
      </section>
    </main>
  );
}
