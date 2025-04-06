'use client';
import * as React from 'react';
// import { NavUser } from '@/components/sidebar/nav-user';
// import { TeamSwitcher } from '@/components/sidebar/team-switcher';
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarRail,
} from '@/components/ui/sidebar';

// import { NavMain } from '@/components/sidebar/nav-main';
import { useSidebarWidth } from '@/store/useSidebarStore';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const sidebarRef = React.useRef<HTMLDivElement>(null);
   const setSidebarWidth = useSidebarWidth((state) => state.setWidth);

   React.useEffect(() => {
      const updateWidth = () => {
         if (sidebarRef.current) {
            const newWidth = sidebarRef.current.offsetWidth;
            setSidebarWidth(newWidth);
         }
      };
      updateWidth(); // İlk render sırasında genişliği hesapla
      window.addEventListener('resize', updateWidth); // Pencere boyutu değiştikçe güncelle

      return () => {
         window.removeEventListener('resize', updateWidth);
      };
   }, [setSidebarWidth]);

   return (
      <Sidebar
         ref={sidebarRef}
         collapsible="icon"
         variant="sidebar"
         className="left-auto"
         {...props}
      >
         <SidebarHeader>{/* <TeamSwitcher /> */}</SidebarHeader>
         <SidebarContent>{/* <NavMain location={location} /> */}</SidebarContent>
         <SidebarFooter>{/* <NavUser /> */}</SidebarFooter>
         <SidebarRail />
      </Sidebar>
   );
}
