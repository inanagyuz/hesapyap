import { dictionary, Locale, i18n, Dictionary } from '@/components/dictionary/getDictionary';

import { LoginForm } from '@/components/auth/LoginForm';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import LocaleSwitcher from '@/components/dictionary/LocaleSwitcher';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
   const { lang } = await params;
   const dic: Dictionary<'common'> = await dictionary('common', lang || i18n.defaultLocale);

   return {
      title: dic.login,
      description: dic?.loginDesc,
   };
}

type Quote = {
   body: string;
   author: string;
};

export default async function SignIn() {
   let quote: Quote = {
      body: '',
      author: '',
   };

   try {
      const response = await fetch('https://favqs.com/api/qotd', {
         headers: {
            Authorization: 'Token token="752be77db383b8601ac2e47d29ffb12d"',
         },
      });
      if (!response.ok) {
         throw new Error('Network response was not ok');
      }
      const data = await response.json();
      quote = data.quote;
   } catch (error) {
      console.error('Error fetching quote:', error);
   }

   return (
      <div className="w-full max-w-sm md:max-w-3xl">
         <div className={cn('flex flex-col gap-6 relative')}>
            <div className="absolute top-5 right-5">
               <LocaleSwitcher />
            </div>
            <Card className="overflow-hidden p-0 pt-12 md:pt-0">
               <CardContent className="grid p-0 md:grid-cols-2 items-stretch ">
                  <div className="p-6 md:p-8">
                     <LoginForm />
                  </div>
                  <div className="items-center flex flex-col justify-center text-center bg-muted/35 p-6 md:p-8 ">
                     <p className="text-lg">{quote?.body}</p>
                     <p className="mt-2 text-sm justify-end ml-auto font-bold underline">
                        {quote?.author}
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
