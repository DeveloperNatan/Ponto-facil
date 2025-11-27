import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ButtonLogout from "./ButtonLogout";
import Image from "next/image";
import { Calendar, Clock4, UserRoundCog } from "lucide-react";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <header className="bg-white dark:bg-slate-950 shadow-sm border-b border-slate-100 dark:border-slate-800">
        <nav className="flex items-center justify-between">
          {/* Logo e nome - Colado na esquerda */}
          <a href="/home" className="flex items-center">
            <Image
              src="/assets/logonew.png"
              width={100}
              height={100}
              alt="Logo"
            />
            <span className="text-xl pl-3 font-bold text-slate-700 dark:text-white">
              Ponto Fácil
            </span>
          </a>

          <div className="flex gap-2">
            <div className="px-4 py-2 cursor-pointer bg-gray-400 rounded">
              <a href="/home/settings/profile">
                <UserRoundCog />
              </a>
            </div>
            <div className="px-4 py-2 cursor-pointer bg-gray-400 rounded">
              <a href="/home/dashboard">
                <Calendar />
              </a>
            </div>
            <div className="px-4 py-2 cursor-pointer bg-gray-400 rounded">
              <a href="/home/registry">
                <Clock4 />
              </a>
            </div>
            <div className="px-4 py-2 bg-gray-400 rounded mr-6">
              <ButtonLogout />
            </div>
          </div>
        </nav>
      </header>

      {children}
    </>
  );
}
