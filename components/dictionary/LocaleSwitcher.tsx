'use client';

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';

import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale } from './getDictionary';

export default function LocaleSwitcher() {
   const pathname = usePathname();
   const router = useRouter();

   const redirectedPathname = (locale: Locale) => {
      if (!pathname) return '/';
      const segments = pathname.split('/');
      segments[1] = locale;
      return segments.join('/');
   };

   const fl = pathname.split('/')[1] as Locale;

   return (
      <Select
         value={fl}
         onValueChange={(locale: Locale) => router.push(redirectedPathname(locale))}
      >
         <SelectTrigger size="sm" className="w-24">
            <SelectValue placeholder="Select a language" />
         </SelectTrigger>
         <SelectContent align="end">
            {i18n.locales.map((locale) => (
               <SelectItem key={locale} value={locale}>
                  {locale === 'en' ? 'English' : locale === 'de' ? 'Deutsch' : 'Türkçe'}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
}
