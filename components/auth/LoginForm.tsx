'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { createBearerToken } from '@/lib/bearerToken';
import { toast } from 'sonner';
import { loginSchema, LoginSchema } from '@/schemas/userSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Loader, LogIn } from 'lucide-react';
import { Dictionary, dictionary } from '@/components/dictionary/getDictionary';

import { Separator } from '@/components/ui/separator';
import { LoginGithub, LoginGoogle } from './auth-button';
import { Locale } from '../dictionary/Locale';

export function LoginForm() {
   const [dicSchema, setDicSchema] = React.useState<Dictionary<'schemaBase'>>();
   const [dicCommon, setDicCommon] = React.useState<Dictionary<'common'>>();
   const [dicUser, setDicUser] = React.useState<Dictionary<'user'>>();
   const lang = Locale();

   React.useEffect(() => {
      (async () => {
         const dicCommon = await dictionary('common', lang);
         const dicSchema = await dictionary('schemaBase', lang);
         const dicUser = await dictionary('user', lang);
         setDicUser(dicUser);
         setDicSchema(dicSchema);
         setDicCommon(dicCommon);
      })();
   }, [lang]);

   const zodSchema = loginSchema(dicSchema);

   const form = useForm<LoginSchema>({
      resolver: zodResolver(zodSchema),
      defaultValues: {
         email: '',
         password: '',
      },
      mode: 'onBlur',
   });

   async function onSubmit(data: LoginSchema) {
      const bearerToken = await createBearerToken();
      const headers = new Headers();
      headers.append('Authorization', bearerToken); // Bearer token ekleme
      headers.append('Content-Type', 'application/json'); // JSON içeriği belirtme

      const loadingToast = toast.loading(dicUser?.loginLoading);
      try {
         const res = await fetch('/api/signIn', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers,
         });

         const contentType = res.headers.get('content-type');

         if (contentType && contentType?.includes('application/json')) {
            if (!res.ok) {
               const resJson = await res.json();
               const msg = resJson?.message;
               let message = '';
               if (msg === 'github') {
                  message = dicUser?.loginFailedGithub ? dicUser?.loginFailedGithub : 'login';
               } else if (msg === 'google') {
                  message = dicUser?.loginFailedGoogle ? dicUser?.loginFailedGoogle : 'login';
               } else if (msg === 'passwordEnter') {
                  message = dicUser?.passwordEnter ? dicUser?.passwordEnter : 'login';
               } else if (msg === 'passwordError') {
                  message = dicUser?.passwordError ? dicUser?.passwordError : 'login';
               } else {
                  message = 'login';
               }

               if (message === 'login') {
                  toast.success(dicUser?.loginSuccess);
                  toast.dismiss(loadingToast);
                  return (window.location.href = '/');
               } else {
                  toast.error(message);
                  return toast.dismiss(loadingToast);
               }
            }
         }
         toast.success(dicUser?.loginSuccess);
         return (window.location.href = '/');
      } catch (error) {
         toast.error(dicUser?.loginFailed + ' : ' + error);
         return toast.dismiss(loadingToast);
      }
   }

   const { isSubmitting } = form.formState;

   return (
      <>
         <div>
            <div className="flex flex-col items-center text-center">
               <h1 className="text-2xl font-bold">{dicCommon?.wellcome}</h1>
               <p className="text-balance text-muted-foreground">{dicUser?.wellcomeBackDesc}</p>
            </div>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel> {dicCommon?.email} </FormLabel>
                           <FormControl>
                              <Input placeholder={dicSchema?.emailEnter} {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel> {dicCommon?.password} </FormLabel>
                           <FormControl>
                              <Input
                                 type="password"
                                 placeholder={dicSchema?.passwordEnter}
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button variant="outline" type="submit" disabled={isSubmitting}>
                     {isSubmitting ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                     ) : (
                        <>
                           <LogIn className="mr-2 h-4 w-4" />
                           {dicUser?.login}
                        </>
                     )}
                  </Button>
               </form>
            </Form>
            <div className="flex flex-col gap-3 mt-4">
               <div className="relative flex justify-center text-xs uppercase items-center overflow-hidden">
                  <Separator orientation="horizontal" />
                  <p className="bg-background px-2 text-muted-foreground whitespace-nowrap">
                     {dicUser?.orNext}
                  </p>
                  <Separator orientation="horizontal" />
               </div>
               <div className="grid grid-cols-2 gap-2">
                  <LoginGoogle />
                  <LoginGithub />
               </div>
            </div>
         </div>
      </>
   );
}
