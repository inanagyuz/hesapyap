'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { dictionary, Dictionary, i18n } from '@/components/dictionary/getDictionary';
import { Locale } from '@/components/dictionary/Locale';
import { THEMES } from './themes';
import { useThemeConfig } from '@/components/theme/active-theme';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { META_THEME_COLORS, useMetaColor } from '@/hooks/use-meta-color';
import { Button } from '@/components/ui/button';

export function ModeSwitcher() {
   const { setTheme, resolvedTheme } = useTheme();
   const { setMetaColor } = useMetaColor();

   const toggleTheme = React.useCallback(() => {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      setMetaColor(resolvedTheme === 'dark' ? META_THEME_COLORS.light : META_THEME_COLORS.dark);
   }, [resolvedTheme, setTheme, setMetaColor]);

   return (
      <Button variant="outline" size="icon" className="group/toggle size-8" onClick={toggleTheme}>
         <SunIcon className="hidden [html.dark_&]:block" />
         <MoonIcon className="hidden [html.light_&]:block" />
         <span className="sr-only">Toggle theme</span>
      </Button>
   );
}

export function ThemeColor() {
   const { activeTheme, setActiveTheme } = useThemeConfig();

   return (
      <Select value={activeTheme} onValueChange={setActiveTheme}>
         <SelectTrigger size="sm" className="w-24">
            <SelectValue placeholder="Select a theme" />
         </SelectTrigger>
         <SelectContent align="end">
            {THEMES.map((theme) => (
               <SelectItem key={theme.name} value={theme.value}>
                  {theme.name}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
}

export function ThemeSelector() {
   const lang = Locale();
   const defaultLang = i18n.defaultLocale;
   const language = lang || defaultLang;
   const [dic, setDic] = React.useState<Dictionary<'common'> | null>(null);

   React.useEffect(() => {
      (async () => {
         const dic = await dictionary('common', language);
         setDic(dic);
      })();
   }, [language]);
   return (
      <div className="flex items-center gap-2">
         <span className="text-sm font-medium">{dic?.theme} :</span>
         <ModeSwitcher /> <ThemeColor />
      </div>
   );
}
