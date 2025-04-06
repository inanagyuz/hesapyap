'use client';
import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@/components/lucideIcons/lucideIcons';
import { icons, Loader } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { MenuLinkSchemaChildren } from '@/schemas/menuSchema';
import { Locale } from '@/components/dictionary/Locale';
import { i18n } from '@/components/dictionary/getDictionary';
import { useSession } from 'next-auth/react';

export function NavMain({ location }: { location: MenuLinkSchemaChildren['location'] }) {
   const { data: session } = useSession();
   const userRole = session?.user?.role || 'VISITOR';
   const lang = Locale();
   const defaulLangue = i18n.defaultLocale;
   const [menuData, setMenuData] = React.useState<MenuLinkSchemaChildren[]>([]);
   const [loading, setLoading] = React.useState(true);
   const [menuTitle, setMenuTitle] = React.useState<MenuLinkSchemaChildren['title']>();
   const [menuStatus, setMenuStatus] = React.useState<MenuLinkSchemaChildren['status']>(false);
   const [menuAccess, setMenuAccess] = React.useState<MenuLinkSchemaChildren['access']>([]);

   React.useEffect(() => {
      (async () => {
         const [menuData] = await Promise.all([fetch(`/api/public/menu/${location}`)]);
         if (!menuData.ok) return setLoading(false);
         const data = await menuData.json();
         if (data?.status === 200) {
            setMenuData(data?.data?.menuLinks);
            setMenuStatus(data?.data?.status);
            setMenuAccess(data?.data?.access);
            const title = lang === defaulLangue ? data?.data?.title : data?.data?.[`title${lang}`];
            setMenuTitle(title);
            setLoading(false);
         }
         return setLoading(false);
      })();
   }, [defaulLangue, lang, location]);

   return loading ? (
      <Loader size={20} className="m-auto animate-spin" />
   ) : (
      menuStatus &&
         ((menuAccess.includes(userRole) && menuAccess.length > 0) || menuAccess.length === 0) &&
         menuTitle !== '' && (
            <SidebarGroup>
               <SidebarGroupLabel>{menuTitle}</SidebarGroupLabel>
               <SidebarMenu>
                  {menuData.map((item) => {
                     if (
                        (item?.access.includes(userRole) && item?.access.length > 0) ||
                        item?.access.length === 0
                     ) {
                        return (
                           <React.Fragment key={uuidv4()}>
                              {(defaulLangue === lang ? item?.title : item?.[`title${lang}`]) !==
                                 '' &&
                                 (item.children &&
                                 item?.parentId === null &&
                                 item.children.length > 0 ? (
                                    <Collapsible
                                       asChild
                                       className="group/collapsible"
                                       key={item.title}
                                    >
                                       <SidebarMenuItem>
                                          <CollapsibleTrigger asChild>
                                             <SidebarMenuButton
                                                tooltip={
                                                   lang === defaulLangue
                                                      ? item?.title
                                                      : item?.[`title${lang}`]
                                                }
                                             >
                                                {item.icon && (
                                                   <Icon
                                                      name={item.icon as keyof typeof icons}
                                                      size={16}
                                                   />
                                                )}
                                                <span>
                                                   {lang === defaulLangue
                                                      ? item.title
                                                      : item[`title${lang}`]}
                                                </span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                             </SidebarMenuButton>
                                          </CollapsibleTrigger>
                                          <CollapsibleContent>
                                             <SidebarMenuSub>
                                                {item.children?.map((subItem) => {
                                                   if (
                                                      (subItem?.access.includes(userRole) &&
                                                         subItem?.access.length > 0) ||
                                                      subItem?.access.length === 0
                                                   ) {
                                                      return (
                                                         <SidebarMenuSubItem key={uuidv4()}>
                                                            <SidebarMenuSubButton asChild>
                                                               <Link
                                                                  href={`/${lang}/${
                                                                     subItem?.pageUrl
                                                                        ? lang === defaulLangue
                                                                           ? 'page/' +
                                                                             subItem?.pageUrl?.slug
                                                                           : 'page/' +
                                                                             subItem?.pageUrl?.[
                                                                                `slug${lang}`
                                                                             ]
                                                                        : lang === defaulLangue
                                                                        ? subItem?.url
                                                                        : subItem?.[`url${lang}`]
                                                                  }`}
                                                               >
                                                                  <span>
                                                                     {lang === defaulLangue
                                                                        ? subItem?.title
                                                                        : subItem?.[`title${lang}`]}
                                                                  </span>
                                                               </Link>
                                                            </SidebarMenuSubButton>
                                                         </SidebarMenuSubItem>
                                                      );
                                                   }
                                                })}
                                             </SidebarMenuSub>
                                          </CollapsibleContent>
                                       </SidebarMenuItem>
                                    </Collapsible>
                                 ) : (
                                    item?.parentId === null && (
                                       <SidebarMenuItem key={uuidv4()}>
                                          <SidebarMenuButton>
                                             {item.icon && (
                                                <Icon
                                                   name={item.icon as keyof typeof icons}
                                                   size={16}
                                                />
                                             )}
                                             <Link
                                                href={`/${lang}/${
                                                   item?.pageUrl
                                                      ? lang === defaulLangue
                                                         ? 'page/' + item?.pageUrl?.slug
                                                         : 'page/' + item?.pageUrl?.[`slug${lang}`]
                                                      : lang === defaulLangue
                                                      ? item?.url
                                                      : item?.[`url${lang}`]
                                                }`}
                                             >
                                                {lang === defaulLangue
                                                   ? item.title
                                                   : item[`title${lang}`]}
                                             </Link>
                                          </SidebarMenuButton>
                                       </SidebarMenuItem>
                                    )
                                 ))}
                           </React.Fragment>
                        );
                     }
                  })}
               </SidebarMenu>
            </SidebarGroup>
         )
   );
}
