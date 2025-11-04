// src/proxy.ts
import { withAuth } from "next-auth/middleware";

export const proxy = withAuth({
  pages:{
    signIn:"/login",
    signOut:"/"
  }
})
// Define as rotas que serão protegidas
export const config = {
  matcher: ["/home/:path*", "/dashboard/:path*"],
};
