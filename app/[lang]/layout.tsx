import '@/app/globals.css';
import 'katex/dist/katex.min.css';

import type { Metadata, Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';
import ThemeProvider from '@/components/theme/theme-provider';
import { ActiveThemeProvider } from '@/components/theme/active-theme';
import { cookies } from 'next/headers';
import { cn } from '@/lib/utils';
import { fontVariables } from '@/components/theme/fonts';
import Head from 'next/head';
import { auth } from '@/auth';
import { i18n, Locale } from '@/components/dictionary/getDictionary';

const META_THEME_COLORS = {
   light: '#ffffff',
   dark: '#09090b',
};

export const viewport: Viewport = {
   themeColor: META_THEME_COLORS.light,
};

export const metadata: Metadata = {
   title: 'Hesapyap.net',
   description: 'Hesapyap.net',
};

export default async function RootLayout({
   children,
   params,
}: {
   children: React.ReactNode;
   params: { lang: Locale };
}) {
   const cookieStore = await cookies();
   const activeThemeValue = cookieStore.get('active_theme')?.value;
   const isScaled = activeThemeValue?.endsWith('-scaled');
   const session = await auth();
   const { lang: langParam } = await params;
   const lang = langParam || i18n.defaultLocale;

   return (
      <SessionProvider session={session}>
         <html lang={lang} suppressHydrationWarning>
            <Head>
               <script
                  dangerouslySetInnerHTML={{
                     __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
                  }}
               />
            </Head>
            <body
               className={cn(
                  'bg-background min-h-svh overscroll-none font-sans antialiased',
                  activeThemeValue ? `theme-${activeThemeValue}` : '',
                  isScaled ? 'theme-scaled' : '',
                  fontVariables
               )}
            >
               <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                  enableColorScheme
               >
                  <ActiveThemeProvider initialTheme={activeThemeValue}>
                     {children}
                  </ActiveThemeProvider>
               </ThemeProvider>
            </body>
         </html>
      </SessionProvider>
   );
}
