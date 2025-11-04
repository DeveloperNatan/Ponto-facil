// app/SessionProviderWrapper.tsx
"use client"; // essencial para habilitar React Context

import { Session } from "inspector/promises";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface Props {
  children: React.ReactNode;
  session?: Session;
}

export default function SessionProviderWrapper({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
