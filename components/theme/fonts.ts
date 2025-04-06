import {
   Geist,
   Geist_Mono,
   Instrument_Sans,
   Inter,
   Mulish,
   Noto_Sans_Mono,
} from 'next/font/google';

import { cn } from '@/lib/utils';

const fontSans = Geist({
   subsets: ['latin'],
   variable: '--font-sans',
   preload: false,
});

const fontMono = Geist_Mono({
   subsets: ['latin'],
   variable: '--font-mono',
   preload: false,
});

const fontInstrument = Instrument_Sans({
   subsets: ['latin'],
   variable: '--font-instrument',
   preload: false,
});

const fontNotoMono = Noto_Sans_Mono({
   subsets: ['latin'],
   variable: '--font-noto-mono',
   preload: false,
});

const fontMullish = Mulish({
   subsets: ['latin'],
   variable: '--font-mullish',
   preload: false,
});

const fontInter = Inter({
   subsets: ['latin'],
   variable: '--font-inter',
   preload: false,
});

export const fontVariables = cn(
   fontSans.variable,
   fontMono.variable,
   fontInstrument.variable,
   fontNotoMono.variable,
   fontMullish.variable,
   fontInter.variable
);
