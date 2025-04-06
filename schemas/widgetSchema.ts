import { z } from 'zod';
import { ZodIssueCode } from 'zod';
import { Dictionary } from '@/components/dictionary/getDictionary';
import { schemaBase } from './schemaBase';

export const informationSchema = (dic?: Dictionary<'schemaBase'>) => {
   return schemaBase()
      .pick({
         id: true,
         title: true,
         titleen: true,
         titlede: true,
         desc: true,
         descen: true,
         descde: true,
         content: true,
         contenten: true,
         contentde: true,
         views: true,
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
      });
};

export type InformationSchema = z.infer<ReturnType<typeof informationSchema>>;
