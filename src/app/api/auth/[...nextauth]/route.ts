import axios from "axios";
import NextAuth, { DefaultSession, type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      cargo?: string | null;
      matriculaId?: number;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    matriculaId?: number;
    cargo?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    matriculaId?: number;
    cargo?: string;
  }
}

const ApiUrl = process.env.NEXT_PUBLIC_API_USER_LOGIN as string;

export const authOptions: AuthOptions = {
  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
     
        try {
          const res = await axios.post(
            ApiUrl,
            {
              email: credentials?.email,
              senha: credentials?.password,
            }
          );

          const user = res.data;
       
          if (user && res.status === 200) {
            return {
              id: user.id?.toString(),
              name: user.nome,
              matriculaId: user.matriculaId,
              cargo: user.cargo,
            };
          }

          return null;
        } catch (error) {
          let message;
          if (axios.isAxiosError(error)) {
            message =  error.response?.data?.message;
            throw new Error(message);
          }
          throw new Error(message);
        }
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.matriculaId = user.matriculaId;
        token.cargo = user.cargo;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.matriculaId = token.matriculaId;
        session.user.cargo = token.cargo as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
