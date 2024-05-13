import { C } from "@/app/const";
import { profile } from "console";
import NextAuth, { NextAuthOptions } from "next-auth";
import { getToken } from "next-auth/jwt";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID ?? "",
      clientSecret: process.env.COGNITO_CLIENT_SECRET ?? "",
      issuer: process.env.COGNITO_ISSUER ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, account, profile, user }) => {
      return token;
    },
    session: async ({ session, token }) => {
      session.user!.id = token.sub!;
      return session;
    },
  },  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
