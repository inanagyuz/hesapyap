'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/components/dictionary/Locale';
import { dictionary, Dictionary } from '@/components/dictionary/getDictionary';
import { ModeSwitcher, ThemeColor, ThemeSelector } from '@/components/theme/theme-selector';
import LocaleSwitcher from '@/components/dictionary/LocaleSwitcher';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
   navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function NavigationMenuTop() {
   const pathname = usePathname();
   const lang = Locale();
   const [dic, setDic] = React.useState<Dictionary<'common'>>();
   React.useEffect(() => {
      (async () => {
         const dic = await dictionary('common', lang);
         setDic(dic);
      })();
   }, [lang]);

   return (
      <div className="w-full flex-col items-center justify-center relative">
         <NavigationMenu>
            <NavigationMenuList className="hidden md:flex">
               <NavigationMenuItem>
                  <NavigationMenuLink
                     asChild
                     className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === `/${lang}` ? 'bg-accent' : ''
                     )}
                  >
                     <Link href={`/${lang}`}>{dic?.home}</Link>
                  </NavigationMenuLink>
               </NavigationMenuItem>
               <NavigationMenuItem>
                  <ModeSwitcher />
               </NavigationMenuItem>
               <NavigationMenuItem>
                  <ThemeColor />
               </NavigationMenuItem>
               <NavigationMenuItem>
                  <LocaleSwitcher />
               </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList className="flex md:hidden">
               <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-accent">
                     <Menu />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col gap-2 justify-end items-end m-auto mr-0">
                     <NavigationMenuLink
                        asChild
                        className={cn(
                           navigationMenuTriggerStyle(),
                           pathname === `/${lang}` ? 'bg-accent' : '',
                           'justify-end w-64'
                        )}
                     >
                        <Link href={`/${lang}`}>{dic?.home}</Link>
                     </NavigationMenuLink>
                     <NavigationMenuLink asChild className="w-64 justify-end items-center">
                        <ThemeSelector />
                     </NavigationMenuLink>
                  </NavigationMenuContent>
               </NavigationMenuItem>
            </NavigationMenuList>
         </NavigationMenu>
      </div>
   );
}
