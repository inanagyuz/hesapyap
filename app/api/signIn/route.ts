import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/auth';
import prisma from '@/lib/prisma';
import { verifyPassword } from '@/lib/helper';
import { verifyBearerToken } from '@/lib/bearerToken';

export async function GET(req: NextRequest) {
   // Tarayıcıdan gelen GET isteği için yönlendirme yap
   return NextResponse.redirect(new URL('/', req.url));
}

export async function POST(req: NextRequest) {
   const bearerToken = req.headers.get('Authorization') || '';
   const isValidToken = await verifyBearerToken(bearerToken);
   if (!isValidToken) return NextResponse.json({ status: 401 });

   try {
      const { email, password } = await req.json();

      // kullanıcı var mı kontrol et
      const existingUser = await prisma.user.findUnique({
         where: {
            email,
         },
         select: {
            id: true,
            email: true,
            password: true,
            accounts: {
               select: {
                  provider: true,
               },
            },
         },
      });

      if (existingUser) {
         if (!existingUser.password) {
            if (existingUser.accounts.length > 0 && existingUser.accounts[0].provider) {
               return NextResponse.json(
                  { message: existingUser.accounts[0].provider },
                  { status: 401 }
               );
            } else {
               return NextResponse.json({ message: 'passwordEnter' }, { status: 401 });
            }
         } else {
            const isPasswordValid = await verifyPassword(password, existingUser.password);
            if (!isPasswordValid) {
               return NextResponse.json({ message: 'passwordError' }, { status: 401 });
            }
         }
      }

      // kullanıcıyı oluştur
      const rawFormData = {
         email: email,
         password: password,
         role: 'USER',
      };

      await signIn('credentials', rawFormData, { redirectTo: '/' }); // auth işlemlerini yap
      return NextResponse.json({ message: 'success' }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
   }
}
