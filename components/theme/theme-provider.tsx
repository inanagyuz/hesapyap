'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { Toaster } from 'sonner';
import { TailwindIndicator } from '@/components/theme/tailwind-indicator';

export default function ThemeProvider({
   children,
   ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
   const ToasterProvider = () => {
      const { theme } = useTheme() as {
         theme: 'light' | 'dark' | 'system';
      };
      return (
         <Toaster
            position="top-right"
            theme={theme}
            expand={true}
            richColors={true}
            closeButton={true}
         />
      );
   };
   return (
      <NextThemesProvider {...props}>
         <ToasterProvider />
         {children}
         <TailwindIndicator />
      </NextThemesProvider>
   );
}
