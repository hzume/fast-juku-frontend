import { C } from "@/app/const";
import NextAuth, { NextAuthOptions } from "next-auth";
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
    jwt: async ({ user, token }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user!.id = token.id;
      return session;
    },
  },  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
