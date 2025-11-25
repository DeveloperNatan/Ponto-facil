import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ButtonLogout from "./ButtonLogout";
import Image from "next/image";

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
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo e nome */}
            <a href="/ ">
              <div className="flex items-center space-x-2">
                <div className="w-14 h-14">
                  <Image
                    src="/assets/logo.png"
                    width={100}
                    height={100}
                    alt="Logo"
                    className="rounded-lg"
                  />
                </div>
                <span className="text-xl font-bold text-slate-700 dark:text-white">
                  Ponto Fácil
                </span>
              </div>
            </a>
            {/* Links */}
            <div className="flex items-center gap-3">
              <a
                href="/home/registry"
                className="px-4 py-2 text-slate-500 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-300 transition-colors font-medium"
              >
                Bater Ponto
              </a>

              <a
                href="/home/dashboard"
                className="px-4 py-2 text-slate-500 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-300 transition-colors font-medium"
              >
                Ver Meus Pontos
              </a>

              <div className="px-2  hover:text-teal-500">
                <ButtonLogout />
              </div>
            </div>
          </nav>
        </div>
      </header>

      {children}
    </>
  );
}
