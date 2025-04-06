import { cookies } from 'next/headers';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Separator } from '@/components/ui/separator';

import { NavigationMenuTop } from '@/components/sidebar/NavigationMenuTop';

export default async function Layout({ children }: { children: React.ReactNode }) {
   const cookieStore = await cookies();
   const cookieOpen = await cookieStore.get('sidebar_state')?.value;
   let defaultOpen = true;
   if (cookieOpen === 'false') defaultOpen = false;

   return (
      <SidebarProvider defaultOpen={defaultOpen} className=" 2xl:container mx-auto">
         <AppSidebar />
         <SidebarInset className=" relative flex-col">
            <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-10">
               <SidebarTrigger className="-ml-1" />
               <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
               <div className="ml-auto flex items-center gap-2">
                  <NavigationMenuTop />
               </div>
            </header>

            <main className="@container grid flex-1">{children}</main>
         </SidebarInset>
      </SidebarProvider>
   );
}
