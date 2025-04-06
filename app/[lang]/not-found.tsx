'use client';
import * as React from 'react';
import { dictionary, Dictionary, i18n } from '@/components/dictionary/getDictionary';
import { Locale } from '@/components/dictionary/Locale';

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { LogoImage } from '@/components/og/og-logo';

export default function NotFound() {
   const lang = Locale();
   const defaultLang = i18n.defaultLocale;
   const language = lang || defaultLang;
   const [dic, setDic] = React.useState<Dictionary<'common'> | null>(null);
   const [logo, setLogo] = React.useState<React.ReactNode | null>(null);

   React.useEffect(() => {
      (async () => {
         const dic = await dictionary('common', language);
         setDic(dic);
      })();
   }, [language]);

   React.useEffect(() => {
      (async () => {
         const logo = await LogoImage({ fs: 32 });
         setLogo(logo);
      })();
   }, []);

   return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
         <div className="flex w-full max-w-sm flex-col gap-6">
            <a href="#" className="flex items-center gap-2 self-center font-medium">
               {logo}
            </a>
         </div>
         <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
               <CardTitle className="text-xl">
                  <h2 className=" text-5xl md:text-9xl font-bold ">404</h2>
               </CardTitle>
               <CardDescription>
                  <p>{dic?.noPageLooking}</p>
               </CardDescription>
               <CardContent>{dic?.noPageLookingDesc}</CardContent>
            </CardHeader>
            <CardFooter className="flex justify-end">
               <a className="underline underline-offset-4" href={`/${language}`}>
                  {dic?.returnHome}
               </a>
            </CardFooter>
         </Card>
      </div>
   );
}
