import { dictionary, Locale } from '@/components/dictionary/getDictionary';

import { Card, CardContent, CardTitle } from '@/components/ui/card';

export default async function HomePage(props: { params: Promise<{ lang: Locale }> }) {
   const { lang } = await props.params;

   const dic = await dictionary('common', lang);
   return <div className="border-0 w-full shadow-none px-1 @md:px-2"></div>;
}
