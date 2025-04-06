'use client';
import * as React from 'react';
import { CircleUser, LockKeyhole, ChevronsUpDown } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
} from '@/components/ui/sidebar';

import { useSession } from 'next-auth/react';
import { Login, LogOutButton, LoginGithub, LoginGoogle } from '@/components/auth/auth-button';
import Link from 'next/link';
import { Locale } from '@/components/dictionary/Locale';
import { dictionary, Dictionary } from '@/components/dictionary/getDictionary';

export function NavUser() {
   const [image, setImage] = React.useState<string>('/avatars/02.png');
   const { isMobile } = useSidebar();
   const { data: session } = useSession();
   const lang = Locale();
   const [dic, setDic] = React.useState<Dictionary<'user'>>();

   React.useEffect(() => {
      if (session?.user?.image) {
         //setImage(`/avatars/${session?.user?.image}`);
         setImage('/avatars/02.png');
      }
   }, [session]);

   React.useEffect(() => {
      (async () => {
         const dic = await dictionary('user', lang);
         setDic(dic);
      })();
   }, [lang]);

   return (
      <SidebarMenu>
         <SidebarMenuItem>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                     size="lg"
                     className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                     <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                           src={image}
                           alt={session ? session?.user?.firstName : dic?.loginIn}
                        />
                        <AvatarFallback className="rounded-lg">HY</AvatarFallback>
                     </Avatar>
                     <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                           {session
                              ? session?.user?.firstName + ' ' + session?.user?.lastName
                              : dic?.loginIn}
                        </span>
                        <span className="truncate text-xs">{session?.user.email}</span>
                     </div>

                     <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg "
                  side={isMobile ? 'bottom' : 'right'}
                  align="end"
                  sideOffset={4}
               >
                  <DropdownMenuLabel className="p-0 font-normal">
                     <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                           <AvatarImage
                              src={image}
                              alt={session ? session?.user?.firstName : dic?.loginIn}
                           />
                           <AvatarFallback className="rounded-lg">HY</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="truncate font-semibold">
                              {session
                                 ? session?.user?.firstName + ' ' + session?.user?.lastName
                                 : dic?.loginIn}
                           </span>
                           {session && (
                              <span className="truncate text-xs">{session?.user.email}</span>
                           )}
                        </div>
                     </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session ? (
                     <>
                        <DropdownMenuGroup>
                           <DropdownMenuItem>
                              <CircleUser />
                              <Link href={`/${lang}/dashboard/dashboard`}>{dic?.myAccount}</Link>
                           </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                           <DropdownMenuItem>
                              <LockKeyhole />
                              {session?.user?.role === 'ADMIN' && (
                                 <Link href={`/${lang}/admin`}>{dic?.admin}</Link>
                              )}
                           </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                           <DropdownMenuItem>
                              <LogOutButton />
                           </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                     </>
                  ) : (
                     <>
                        <DropdownMenuGroup>
                           <DropdownMenuItem>
                              <Login />
                           </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                           <DropdownMenuItem>
                              <LoginGoogle />
                           </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                           <DropdownMenuItem>
                              <LoginGithub />
                           </DropdownMenuItem>
                        </DropdownMenuGroup>
                     </>
                  )}
               </DropdownMenuContent>
            </DropdownMenu>
         </SidebarMenuItem>
      </SidebarMenu>
   );
}
