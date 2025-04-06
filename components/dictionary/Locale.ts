/*
 * Bu dsoya web site dilini belirlemek için kullanılır.
 *
 */

'use client';
import { usePathname } from 'next/navigation';
import { i18n, type Locale } from './getDictionary';

export function Locale() {
   const pathname = usePathname();
   const redirectedPathname = () => {
      if (!pathname) return i18n.defaultLocale;
      const locale = pathname.split('/')[1] as Locale;
      if (!i18n.locales.includes(locale)) {
         return i18n.defaultLocale;
      }
      return locale;
   };

   return redirectedPathname();
}
