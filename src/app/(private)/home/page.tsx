import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="flex items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-500">
        Olá, {session?.user.name}
      </h1>
    </main>
  );
}
