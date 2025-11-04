import { Lightbulb, Smile } from "lucide-react";
import Image from "next/image";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 ">
      {/* Header/Navigation */}
      <header className="bg-white dark:bg-slate-950 shadow-sm border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
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
                Ponto fácil
              </span>
            </div>
            <div className="flex gap-3">
              <a
                href="/login"
                className="px-4 py-2 text-slate-500 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-300 transition-colors"
              >
                Login
              </a>
              <a
                href="/sign-in"
                className="px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors shadow-sm"
              >
                Sign-in
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <div className="space-y-4 mt-10">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 ">
              Bem-vindo
            </h1>
            <p className="text-xl text-balck-500 dark:text-slate-400 max-w-2xl mx-auto">
              Uma solução simples e eficiente para registrar pontos
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <a
              href="/home"
              className="px-8 py-3 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-all shadow-md hover:shadow-lg font-medium"
            >
              Acesse
            </a>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6 pt-16">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-teal-500 dark:text-teal-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-white mb-2">
                Rápido
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Performance otimizada para melhor experiência
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smile className="w-6 h-6 text-teal-500 dark:text-teal-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-white mb-2">
                Simples
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Interface intuitiva e fácil de usar
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
            © 2025 Ponto fácil. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
