import { NextRequest, NextResponse } from 'next/server';
import authConfig from './auth.config';
import NextAuth from 'next-auth';
import { i18n, getLocale } from '@/components/dictionary/getDictionary';

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
const lang = i18n.locales;
const isLocaleMissing = (path: string) =>
   lang.every((locale) => !path.startsWith(`/${locale}/`) && path !== `/${locale}`);

export default auth(async function middleware(req: NextRequest) {
   const path = req.nextUrl.pathname;
   const defaultLang = i18n.defaultLocale;
   const locale = getLocale(req);

   /*
    * Dil kontrolü
    * Eğer path,  dil kontolu yaparken belirtilen dillerden biri ile başlamıyorsa
    * False döner
    * Public dosyalar için devam eder
    * api ile başlayan rotalar kontrol etmez ve devam eder
    * ile başlamıyorsa api erişim kontrolü yapar
    */

   if (!path.startsWith('/api') && isLocaleMissing(path)) {
      // Public ve _next  dosyaları için devam et
      if (isPublicFile(path) || path.startsWith('/_next')) {
         return NextResponse.next(); // Public dosyalar için devam et
      }

      // Dil kontrolü yapar ve dil yoksa varsayılan dile yönlendirir
      return NextResponse.redirect(
         new URL(`/${locale}${path.startsWith('/') ? '' : '/'}${path}`, req.url)
      );
   }

   return NextResponse.next();
});

export const config = {
   matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
      '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)/:path*',
   ],
};
