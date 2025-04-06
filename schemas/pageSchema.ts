import { z } from 'zod';
import { ZodIssueCode } from 'zod';
import { Dictionary } from '@/components/dictionary/getDictionary';
import { schemaBase } from './schemaBase';

export const pageSchema = (dic?: Dictionary<'schemaBase'>) => {
   return schemaBase(dic)
      .pick({
         id: true,
         title: true,
         titleen: true,
         titlede: true,
         desc: true,
         descen: true,
         descde: true,
         slug: true,
         slugen: true,
         slugde: true,
         content: true,
         contenten: true,
         contentde: true,
         views: true,
         keywords: true,
         keywordsen: true,
         keywordsde: true,
         categoryId: true,
         images: true,
         component: true,
         status: true,
         access: true,
         user: true,
         informationId: true,
         createdById: true,
         createdBy: true,
         updatedById: true,
         updatedBy: true,
         createdAt: true,
         updatedAt: true,
         createdView: true,
         updatedView: true,
         authorView: true,
         viewsView: true,
      })
      .superRefine((data, ctx) => {
         const message = dic?.isTitleRequired || 'En az bir başlık alanı dolu olmalıdır';

         // Title alanlarının kontrolü
         if (!data.title && !data.titleen && !data.titlede) {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['title'], message: message });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['titleen'], message: message });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['titlede'], message: message });
         }
         if (!data.content && !data.contenten && !data.contentde) {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['content'], message: message });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['contenten'], message: message });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['contentde'], message: message });
         }
      });
};
export type PageSchema = z.infer<ReturnType<typeof pageSchema>>;

/// kategori schema
export const pageCategorySchema = (dic?: Dictionary<'schemaBase'>) => {
   return schemaBase(dic)
      .pick({
         id: true,
         title: true,
         titleen: true,
         titlede: true,
         desc: true,
         descen: true,
         descde: true,
         images: true,
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
         const message = dic?.isTitleRequired || 'En az bir başlık alanı dolu olmalıdır';

         // Title alanlarının kontrolü
         if (!data.title && !data.titleen && !data.titlede) {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['title'], message: message });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['titleen'], message: message });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['titlede'], message: message });
         }
         if (!data.desc && !data.descen && !data.descde) {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['desc'], message: message });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['descen'], message: message });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['descde'], message: message });
         }
      });
};
export type PageCategorySchema = z.infer<ReturnType<typeof pageCategorySchema>>;
