'use client';
import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import { Icons } from '@/components/ui/icons';
import { LogIn, LogOut } from 'lucide-react';
import { Locale } from '@/components/dictionary/Locale';
import { dictionary, Dictionary } from '@/components/dictionary/getDictionary';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LoginGithub = () => {
   return (
      <Button
         className="w-full"
         variant="outline"
         onClick={() => signIn('github', { callbackUrl: '/' })}
      >
         <Icons.gitHub className="mr-2 h-4 w-4" />
      </Button>
   );
};

const LoginGoogle = () => {
   return (
      <Button
         className="w-full"
         variant="outline"
         onClick={() => signIn('google', { callbackUrl: '/' })}
      >
         <Icons.google className="mr-2 h-4 w-4" />
      </Button>
   );
};

const LogOutButton = () => {
   const lang = Locale();
   const [dic, setDic] = React.useState<Dictionary<'common'>>();

   React.useEffect(() => {
      (async () => {
         const dic = await dictionary('common', lang);
         setDic(dic);
      })();
   }, [lang]);

   return (
      <Button className="w-full" variant="outline" onClick={() => signOut()}>
         <LogOut className="mr-2 h-4 w-4" />
         {dic?.logout}
      </Button>
   );
};

const Login = () => {
   const lang = Locale();
   const [dic, setDic] = React.useState<Dictionary<'common'>>();
   React.useEffect(() => {
      (async () => {
         const dic = await dictionary('common', lang);
         setDic(dic);
      })();
   }, [lang]);

   return (
      <Button className="w-full" variant="outline" asChild>
         <Link href={`/${lang}/signIn`} className="w-full">
            <LogIn />
            {dic?.loginMailAndPassword}
         </Link>
      </Button>
   );
};

const AuthButton = () => {
   return (
      <div className="flex flex-col gap-2 w-auto">
         <Login />
         <LoginGoogle />
         <LoginGithub />
      </div>
   );
};

export { LoginGithub, LoginGoogle, LogOutButton, AuthButton, Login };
