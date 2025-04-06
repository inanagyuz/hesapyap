import { z } from 'zod';
import { ZodIssueCode } from 'zod';
import { Dictionary } from '@/components/dictionary/getDictionary';
import { location, role } from './schemaBase';

/// Form tabanlı schema tanımlamaları
export const menuSchemaBase = (dic?: Dictionary<'schemaBase'>) => {
   return z.object({
      id: z.string().optional(),
      title: z.string().optional(),
      titleen: z.string().optional(),
      titlede: z.string().optional(),
      desc: z.string().optional(),
      descen: z.string().optional(),
      descde: z.string().optional(),
      url: z.string().optional(),
      urlen: z.string().optional(),
      urlde: z.string().optional(),
      parentId: z.union([z.string().nullish(), z.literal('')]),
      pageUrlId: z.union([z.string().nullish(), z.literal('')]),
      icon: z.string().nullable().optional(),
      informationId: z.string().nullable().optional(),
      pageUrl: z
         .object({
            slug: z.string().optional(),
            slugen: z.string().optional(),
            slugde: z.string().optional(),
         })
         .optional(),
      menuLinks: z.array(z.string()).optional(),
      menuId: z.string().nullable(),
      order: z.coerce
         .number({ invalid_type_error: dic?.isNumber })
         .positive({ message: dic?.isPositiveNumber })
         .optional(),
      location: location.optional(),
      status: z
         .boolean({
            invalid_type_error: dic ? dic?.isBoolean : '',
         })
         .optional(),
      access: z.array(role).default([]),
      createdById: z.string().optional(),
      createdBy: z
         .object({
            firstName: z.string().optional(),
            lastName: z.string().optional(),
            email: z.string().optional(),
            role: role.optional(),
            image: z.string().optional(),
         })
         .optional(),
      updatedById: z.string().optional(),
      updatedBy: z
         .object({
            firstName: z.string().optional(),
            lastName: z.string().optional(),
            email: z.string().optional(),
            role: role.optional(),
            image: z.string().optional(),
         })
         .optional(),
      createdAt: z
         .date()
         .default(() => new Date())
         .optional(),
      updatedAt: z
         .date()
         .default(() => new Date())
         .optional(),
   });
};

export const menuSchema = (dic?: Dictionary<'schemaBase'>) => {
   return menuSchemaBase(dic)
      .pick({
         id: true,
         title: true,
         titleen: true,
         titlede: true,
         desc: true,
         descen: true,
         descde: true,
         url: true,
         urlen: true,
         urlde: true,
         icon: true,
         parentId: true,
         menuLinks: true,
         location: true,
         order: true,
         status: true,
         access: true,
         informationId: true,
         createdById: true,
         createdBy: true,
         updatedById: true,
         updatedBy: true,
         createdAt: true,
         updatedAt: true,
      })
      .superRefine((data, ctx) => {
         const titleMessage = dic?.isRequried || 'En az bir başlık alanı dolu olmalıdır';

         // Title alanlarının kontrolü
         if (!data.title && !data.titleen && !data.titlede) {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['title'], message: titleMessage });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['titleen'], message: titleMessage });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['titlede'], message: titleMessage });
         }
      });
};
export type MenuSchema = z.infer<ReturnType<typeof menuSchema>>;

export const menuLinkSchema = (dic?: Dictionary<'schemaBase'>) => {
   return menuSchemaBase(dic)
      .pick({
         id: true,
         title: true,
         titleen: true,
         titlede: true,
         desc: true,
         descen: true,
         descde: true,
         url: true,
         urlen: true,
         urlde: true,
         icon: true,
         menuId: true,
         parentId: true,
         pageUrlId: true,
         order: true,
         status: true,
         access: true,
         createdById: true,
         createdBy: true,
         updatedById: true,
         updatedBy: true,
         createdAt: true,
         updatedAt: true,
      })
      .superRefine((data, ctx) => {
         const titleMessage = dic?.isRequried || 'En az bir başlık alanı dolu olmalıdır';
         // Title alanlarının kontrolü
         if (!data.title && !data.titleen && !data.titlede) {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['title'], message: titleMessage });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['titleen'], message: titleMessage });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['titlede'], message: titleMessage });
         }
         if (!data.url && !data.urlen && !data.urlde && !data.pageUrlId) {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['url'],
               message: dic?.isRequried,
            });
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['urlen'],
               message: dic?.isRequried,
            });
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['urlde'],
               message: dic?.isRequried,
            });
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['pageUrlId'],
               message: dic?.isRequried,
            });
         }
      });
};
export type MenuLinkSchema = z.infer<ReturnType<typeof menuLinkSchema>>;

export const menuLinkSchemaChildren = menuSchemaBase().extend({
   children: z.array(menuSchemaBase()).optional(),
});
export type MenuLinkSchemaChildren = z.infer<typeof menuLinkSchemaChildren>;
