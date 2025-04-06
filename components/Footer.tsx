'use client';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { dictionary, Dictionary, i18n } from '@/components/dictionary/getDictionary';
import { Locale } from '@/components/dictionary/Locale';

export const Footer = () => {
   const lang = Locale();
   const defaultLang = i18n.defaultLocale;
   const language = lang || defaultLang;
   const [dic, setDic] = React.useState<Dictionary<'common'> | null>(null);
   const [terms, setTerms] = React.useState<string>('');
   const [privacy, setPrivacy] = React.useState<string>('');
   React.useEffect(() => {
      (async () => {
         const dic = await dictionary('common', language);
         setDic(dic);
      })();
      if (language === 'en') {
         setTerms('page/terms-and-conditions');
         setPrivacy('page/privacy-policy');
      } else if (language === 'de') {
         setTerms('page/geschäftsbedingungen');
         setPrivacy('page/datenschutz-bestimmungen');
      } else {
         setTerms('page/şartlar-ve-koşullar');
         setPrivacy('page/gizlilik-politikası');
      }
   }, [language]);

   return (
      <>
         <Separator className="my-4" />
         <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary p-4">
            <div className="flex flex-col gap-2 items-center">
               <div className="flex h-5 items-center space-x-4 text-sm">
                  <Separator orientation="vertical" />
                  <Link href={`/${language}/${terms}`} passHref>
                     {dic?.terms}
                  </Link>
                  <Separator orientation="vertical" />
                  <Link href={`/${language}/${privacy}`} passHref>
                     {dic?.privacy}
                  </Link>
                  <Separator orientation="vertical" />
               </div>
               <div>
                  <p className="text-sm text-muted-foreground">
                     Hesapyap.net@{new Date().getFullYear()} - {dic?.allRightsReserved}
                  </p>
               </div>
            </div>
         </div>
      </>
   );
};
