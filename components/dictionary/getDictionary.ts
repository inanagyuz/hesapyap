/*
 * Dil dosyalarını yüklemek için kullanılan fonksiyonlar
 * - dictionary: Dil dosyalarını yükler
 * - Dictionaries: Dil dosyalarının türlerini alır
 * - DictionaryFile: Dil dosyalarının türlerini alır
 * - Dictionary: Dil dosyalarının türlerini alır
 *  - i18n: Dil dosyalarının varsayılan ve desteklenen dillerini alır
 *  - Locale: Dil dosyalarının desteklenen dillerini alır
 * - DefaultLocale: Dil dosyalarının varsayılan dilini alır
 * - dictionaries: Dil dosyalarını yüklemek için kullanılan fonksiyonları alır
 * - interpolate: Dil dosyalarındaki değişkenleri doldurmak için kullanılır
 * - getLocale: Kullanıcının tarayıcı ayarlarından dil bilgisini alır
 * - match: Dil bilgisini karşılaştırır
 * - Negotiator: Dil bilgisini alır
 * - NextRequest: Dil bilgisini alır
 * - Awaited: Dil bilgisini alır
 * - ReturnType: Dil bilgisini alır
 */

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';

// JSON dosyalarından türetilen türü elde edin için kullanılan fonksiyon
export const i18n = {
   defaultLocale: 'tr',
   locales: ['tr', 'de', 'en'],
} as const;
// Dil dosyalarının desteklenen dillerini alır
export type Locale = (typeof i18n)['locales'][number];
// Dil dosyalarının varsayılan dilini alır
export type DefaultLocale = typeof i18n.defaultLocale;

// Dil dosyalarındaki değişkenleri doldurmak için kullanılır
const dictionaries = {
   common: () => import('./dictionaries/common.json').then((module) => module.default),
   user: () => import('./dictionaries/user.json').then((module) => module.default),
   post: () => import('./dictionaries/post.json').then((module) => module.default),
   menu: () => import('./dictionaries/menu.json').then((module) => module.default),
   error: () => import('./dictionaries/error.json').then((module) => module.default),
   dataTable: () => import('./dictionaries/dataTable.json').then((module) => module.default),
   richEditor: () => import('./dictionaries/richEditor.json').then((module) => module.default),
   siteSetting: () => import('./dictionaries/siteSetting.json').then((module) => module.default),
   image: () => import('./dictionaries/image.json').then((module) => module.default),
   component: () => import('./dictionaries/component.json').then((module) => module.default),
   widget: () => import('./dictionaries/widget.json').then((module) => module.default),
   schemaBase: () => import('./dictionaries/schemaBase.json').then((module) => module.default),
   budget: () => import('./dictionaries/budget.json').then((module) => module.default),
};

// JSON dosyalarından türetilen türü elde edin
type Dictionaries = typeof dictionaries;

// Bireysel dil dosyasının türünü türetin
type DictionaryFile<T extends keyof Dictionaries> = Awaited<ReturnType<Dictionaries[T]>>;

// Dictionary fonksiyonunu tiplendir
export const dictionary = async <T extends keyof Dictionaries>(
   category: T,
   lang: keyof DictionaryFile<T>
): Promise<DictionaryFile<T>[typeof lang]> => {
   const dic = await dictionaries[category]();
   return dic[lang as Locale] as DictionaryFile<T>[typeof lang];
};

// Genel Dictionary türü
export type Dictionary<T extends keyof Dictionaries> = Awaited<ReturnType<typeof dictionary<T>>>;

// Dil dosyalarından türetilen türü elde edin için kullanılan fonksiyon
export function interpolate(text: string, placeholders: { [key: string]: string }): string {
   // Json dönüşü yapılacak
   return text.replace(/{(\w+)}/g, (_, key) => placeholders[key] || '');
}

// Kullanıcının tarayıcı ayarlarından dil bilgisini al
export function getLocale(request: NextRequest): string | undefined {
   // Negotiator kütüphanesi için headers objesi oluştur
   const negotiatorHeaders: Record<string, string> = {};
   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

   // @ts-expect-error locales are readonly
   const locales: string[] = i18n.locales;

   // Yerel dil bilgisini al ve döndür
   // eslint-disable-next-line prefer-const
   let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

   const locale = match(languages, locales, i18n.defaultLocale);

   return locale;
}
