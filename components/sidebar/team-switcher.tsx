'use client';

import * as React from 'react';
import { ChevronsUpDown, Percent, GalleryVerticalEnd, AudioWaveform, Command } from 'lucide-react';

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
} from '@/components/ui/sidebar';

import { Locale } from '@/components/dictionary/Locale';
import { i18n } from '@/components/dictionary/getDictionary';
import { SiteSettingSchema } from '@/schemas/sitesettingSchema';

type Logo = {
   name: string;
   logo: React.ElementType;
   plan: string;
};

// This is sample data.

export const logo: Logo[] = [
   {
      name: 'Hesapyap.net',
      logo: Percent,
      plan: 'Hesapyap.net',
   },
   {
      name: 'Hesapyap.net Inc',
      logo: GalleryVerticalEnd,
      plan: 'Hesapyap.net Enterprise',
   },
   {
      name: 'Hesapyap.net Corp.',
      logo: AudioWaveform,
      plan: 'Hesapyap.net Startup',
   },
   {
      name: 'Hesapyap.net Free.',
      logo: Command,
      plan: 'Hesapyap.net Free',
   },
];

export function TeamSwitcher() {
   const lang = Locale();
   const defaultLang = i18n.defaultLocale;
   const [loading, setLoading] = React.useState(true);
   const [data, setData] = React.useState<SiteSettingSchema>();
   const { isMobile } = useSidebar();
   const [activeLogo, setActiveLogo] = React.useState<Logo>(logo[0]);

   React.useEffect(() => {
      // Sayfa yüklendiğinde localStorage'dan seçilen logoyu al
      const savedLogoName = localStorage.getItem('activeLogo');
      const savedLogo = logo.find((item) => item.name === savedLogoName);
      if (savedLogo) {
         setActiveLogo(savedLogo);
      }
   }, []);

   React.useEffect(() => {
      setLoading(true);
      (async () => {
         const data = await fetch(`/api/public/siteSetting`);
         if (!data.ok) return setLoading(false);
         const dataJson = await data.json();
         if (dataJson?.status !== 200) return setLoading(false);
         if (!dataJson?.data) return setLoading(false);
         setData(dataJson?.data);
         setLoading(false);
      })();
   }, [lang]);

   const handleLogoChange = (item: Logo) => {
      setActiveLogo(item);
      // Seçilen logoyu localStorage'a kaydet
      localStorage.setItem('activeLogo', item.name);
   };

   if (loading) return null;

   return (
      <SidebarMenu>
         <SidebarMenuItem>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                     size="lg"
                     className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                     <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <activeLogo.logo className="size-4" />
                     </div>
                     <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                           {lang === defaultLang ? data?.title : data?.[`title${lang}`]}
                        </span>
                        <span className="truncate text-xs">
                           {lang === defaultLang ? data?.tagline : data?.[`tagline${lang}`]}
                        </span>
                     </div>
                     <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side={isMobile ? 'bottom' : 'right'}
                  sideOffset={4}
               >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                     {lang === defaultLang ? data?.title : data?.[`title${lang}`]}
                  </DropdownMenuLabel>
                  {logo.map((item, index) => (
                     <DropdownMenuItem
                        key={item.name}
                        onClick={() => handleLogoChange(item)}
                        className="gap-2 p-2"
                     >
                        <div className="flex size-6 items-center justify-center rounded-sm border">
                           <item.logo className="size-4 shrink-0" />
                        </div>
                        {item.name}
                        <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                     </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2">
                     <div className="font-medium text-muted-foreground">
                        {lang === defaultLang ? data?.tagline : data?.[`tagline${lang}`]}
                     </div>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </SidebarMenuItem>
      </SidebarMenu>
   );
}
