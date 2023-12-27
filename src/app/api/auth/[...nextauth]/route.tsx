import { C } from '@/app/const';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CognitoProvider from "next-auth/providers/cognito"

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CognitoProvider({
        clientId: process.env.COGNITO_CLIENT_ID ?? '' ,
        clientSecret: process.env.COGNITO_CLIENT_SECRET ?? '',
        issuer: process.env.COGNITO_ISSUER ?? '',
        // checks: 'nonce',
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
          if (session?.user) {
            // @ts-ignore
            session.user.id = token.uid;
          }
          return session;
        },
        jwt: async ({ user , token }) => {
          if (user) {
            token.uid = user.id;
          }
          return token;
        },
      },
      session: {
        strategy: 'jwt',
      },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
