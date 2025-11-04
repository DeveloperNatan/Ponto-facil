import { getServerSession } from "next-auth";
import ButtonLogout from "./ButtonLogout";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <div>Olá, {session?.user?.name}</div>
      <div className="text-white"> aqui {session?.user?.matriculaId}</div>
      <div>{session?.user?.email}</div>
      <div>
        <ButtonLogout />
      </div>
    </div>
  );
}
