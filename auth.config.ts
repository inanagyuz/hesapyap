import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { hashPassword, verifyPassword } from '@/lib/helper';
import { LoginSchema } from '@/schemas/userSchema';
import prisma from './lib/prisma';
import type { JWT } from 'next-auth/jwt';
import type { DefaultSession } from 'next-auth';

import type { NextAuthConfig } from 'next-auth';

declare module 'next-auth' {
   interface Session {
      user: {
         role?: string;
         firstName?: string;
         lastName?: string;
         id?: string;
      } & DefaultSession['user'];
   }
}
declare module 'next-auth/jwt' {
   interface JWT {
      role?: string;
      firstName?: string;
      lastName?: string;
      id?: string;
   }
}

export default {
   providers: [
      GitHub,
      Google,
      Credentials({
         name: 'Credentials',
         credentials: {
            email: {
               label: 'Email',
               type: 'email',
               placeholder: 'inan@inan.com',
            },
            password: { label: 'Şifre', type: 'password' },
         },
         authorize: async (credentials) => {
            if (!credentials || !credentials.email || !credentials.password) {
               return null;
            }

            const email = credentials.email as LoginSchema['email'];
            const password = credentials.password as LoginSchema['password'];
            if (!email || !password) return null;
            const hash = await hashPassword(password);

            let user = await prisma.user.findUnique({
               where: {
                  email,
               },
            });

            if (!user) {
               user = await prisma.user.create({
                  data: {
                     email,
                     password: hash,
                  },
               });
            } else {
               if (!user.password) {
                  throw new Error('Şifre oluşturulamadı.');
               }
               const isMatch = verifyPassword(user.password, password);
               if (!isMatch) {
                  throw new Error('Yanlış şifre girdiniz.');
               }
            }

            return user;
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         const data = { ...token, ...user };
         return data;
      },
      async session({ session, token }: { session: DefaultSession; token: JWT }) {
         return {
            ...session,
            user: {
               ...session.user,
               role: token.role,
               firstName: token.firstName,
               lastName: token.lastName,
               id: token.id,
            },
         };
      },
   },
   trustHost: true,
} satisfies NextAuthConfig;
