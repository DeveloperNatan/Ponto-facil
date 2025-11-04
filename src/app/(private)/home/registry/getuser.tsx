import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div>
      <div>{session?.expires.length}</div>
      <div>{session?.user.matriculaId}</div>
      <div>{session?.user?.email}</div>
    </div>
  );
}
