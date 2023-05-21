import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/libs/prismadb'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Correo:',
          type: 'email',
          placeholder: 'correo@google.com',
        },
        password: {
          label: 'Contraseña:',
          type: 'password',
          placeholder: 'Contraseña',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid Credentials')
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        )
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }
        return user
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    maxAge: 604800, // 7d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },
  secret: process.env.NEXTAUTH_SECRET,
})
