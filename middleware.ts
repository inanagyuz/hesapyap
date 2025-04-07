import { NextRequest, NextResponse } from 'next/server';
import authConfig from './auth.config';
import NextAuth from 'next-auth';
import { i18n } from '@/components/dictionary/getDictionary';

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);

const PUBLIC_FILE = /\.(.*)$/;

/*
 *********************** Public Dosyalar ************************
 * Public dosyalar
 * favicon.ico, robots.txt, sitemap.xml, manifest.webmanifest
 * gibi dosyalar için erişim kontrolü yapmaz
 * CSRF koruması yapmaz
 * Rol kontrolü yapmaz
 * Dil kontrolü yapmaz
 */
const publicFiles = [
   '/favicon.ico',
   '/sitemap.xml',
   '/sitemap.xml.gz',
   '/manifest.webmanifest',
   '/apple-touch-icon.png',
   '/android-chrome-192x192.png',
   '/android-chrome-512x512.png',
   '/safari-pinned-tab.svg',
   '/site.webmanifest',
   '/robots.txt',
   '/sw.js',
   '/sw.js.map',
   '/manifest.json',
   '/browserconfig.xml',
   '/images/',
   '/fonts/',
];
const isPublicFile = (path: string) =>
   PUBLIC_FILE.test(path) || publicFiles.some((file) => path.startsWith(file));

/*
 * ************************************ Dil Kontrolü **********************************
 * Dil kontrolü
 * Eğer path,  dil kontolu yaparken belirtilen dillerden biri ile başlamıyorsa
 * False döner ve api erişim kontrolü yapılır
 */
const isLocaleMissing = (lang: string) => {
   return i18n.locales.some((locale) => locale === lang);
};

/*
 * ************************************ Erişim Kontrolü **********************************
 * Erişim kontrolü
 */

const protectedRoutes = ['dashboard', 'admin'];
const adminRoutes = ['dashboard', 'admin'];
const userRoutes = ['dashboard'];

export const roleAccess = (role: string, path: string) => {
   if (role === 'ADMIN') return adminRoutes.includes(path);
   if (role === 'USER') return userRoutes.includes(path);
   return false;
};

/*
 * ************************************ Middleware **********************************
 * Middleware
 * Middleware, Next.js uygulamanızda gelen istekleri işlemek için kullanılan bir işlevdir.
 * Middleware, istekleri yönlendirmek, kimlik doğrulama yapmak, hata ayıklamak ve daha fazlası için kullanılabilir.
 * Middleware, isteklerinizi işlemek için bir dizi işlevi zincirleme olarak kullanmanıza olanak tanır.
 */

export default auth(async function middleware(req: NextRequest) {
   const path = req.nextUrl.pathname;
   const lang = path.split('/')[1];
   const slug = path.split('/')[2];
   const defaultLocale = i18n.defaultLocale; // Varsayılan dil
   const session = await auth(); // Oturum bilgilerini al
   const role = session?.user?.role; // Kullanıcı rolünü al

   // Eğer path,  api ile başlıyorsa ve _next ile başlamıyorsa
   // Erişim kontrolü yapmaz
   if (path.startsWith('/api') || isPublicFile(path)) return NextResponse.next();

   /*
    * Dil kontrolü
    * Eğer path,  dil kontolu yaparken belirtilen dillerden biri ile başlamıyorsa
    * False döner
    * Public dosyalar için devam eder
    * api ile başlayan rotalar kontrol etmez ve devam eder
    * ile başlamıyorsa api erişim kontrolü yapar
    */

   if (!isLocaleMissing(lang) || !lang) {
      // Dil kontrolü yapar ve dil yoksa varsayılan dile yönlendirir
      return NextResponse.redirect(
         new URL(`/${defaultLocale}${path.startsWith('/') ? '' : '/'}`, req.url)
      );
   }

   // Eğer path,  public dosyalar ile başlıyorsa
   if (protectedRoutes.includes(path)) {
      if (!role) {
         // Eğer kullanıcı oturum açmamışsa
         return NextResponse.redirect(new URL(`/${lang}/signIn`, req.url));
      }
      const access = roleAccess(role, slug);
      if (!access) {
         return NextResponse.redirect(new URL(`/${lang}/403`, req.url));
      }
   }

   return NextResponse.next();
});

export const config = {
   matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
      '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)/:path*',
   ],
};
