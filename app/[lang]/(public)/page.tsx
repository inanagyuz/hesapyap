import { dictionary, Locale } from '@/components/dictionary/getDictionary';

import { Card, CardContent, CardTitle } from '@/components/ui/card';

export default async function HomePage(props: { params: Promise<{ lang: Locale }> }) {
   const { lang } = await props.params;

   const dic = await dictionary('common', lang);
   return (
      <div className="border-0 w-full shadow-none px-1 @md:px-2">
         <Card className="w-full border-0 shadow-none">
            <CardContent className="px-2 py-1">
               <CardTitle className="text-sm font-normal text-muted-foreground">
                  {dic?.about}
               </CardTitle>
            </CardContent>
         </Card>
      </div>
   );
}
