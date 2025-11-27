import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { Frown, House, Meh, Smile } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-teal-50">
      {/* Header Section */}
      <div className="bg-white border-b border-blue-100 px-6 py-8">
        <h1 className="text-3xl font-bold text-slate-800">Gestão de pessoas</h1>
        <div className="flex">
          <p className="text-slate-500 my-1">Meus Analytics</p>
          <House className=" rounded text-gray-400 my-1 mx-1" />
        </div>
      </div>

      <div className="px-6 py-8 space-y-6">
        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              <div className="w-[75px] h-[75px] rounded-full overflow-hidden">
                <Image
                  src="/assets/noturnboy.jpg"
                  width={100}
                  height={100}
                  alt="Logo"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col items-start gap-2 px-4">
                <span className="text-slate-500 text-sm">Nome:</span>
                <span className=" text-black  text-sm font-medium">
                  {session?.user.name}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 px-4">
              <span className="text-slate-500 text-sm">Cargo:</span>
              <span className=" text-black  text-sm font-medium">
                {session?.user.cargo}
              </span>
            </div>

            <div className="flex flex-col items-start gap-2 px-4">
              <span className="text-slate-500 text-sm">Departamento:</span>
              <span className=" text-black  text-sm font-medium">
                add feature
              </span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-slate-500 text-sm">Empresa:</span>
              <span className="text-slate-700 font-medium">add feature</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap">
          <a
            href="/home/registry"
            className="flex-1 min-w-[200px] px-6 py-4 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-all shadow-sm hover:shadow-md text-center"
          >
            Bater Ponto
          </a>

          <a
            href="/home/dashboard"
            className="flex-1 min-w-[200px] px-6 py-4 bg-blue-900 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md text-center"
          >
            Ver Meus Pontos
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Como você está se sentindo hoje?
          </h2>

          <div className="flex gap-4 justify-center">
            <button className="p-4 cursor-pointer rounded-xl bg-green-50 hover:bg-green-100 transition-colors group">
              <Smile className="w-10 h-10 text-green-500 group-hover:scale-110 transition-transform" />
            </button>

            <button className="p-4 cursor-pointer rounded-xl bg-yellow-50 hover:bg-yellow-100 transition-colors group">
              <Meh className="w-10 h-10 text-yellow-500 group-hover:scale-110 transition-transform" />
            </button>

            <button className="p-4 cursor-pointer rounded-xl bg-red-50 hover:bg-red-100 transition-colors group">
              <Frown className="w-10 h-10 text-red-500 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
