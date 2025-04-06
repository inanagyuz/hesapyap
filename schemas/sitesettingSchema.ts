import { z, ZodIssueCode } from 'zod';
import { Dictionary } from '@/components/dictionary/getDictionary';

export const siteSettingSchemaBase = (dic?: Dictionary<'siteSetting'>) => {
   return z.object({
      id: z.string().optional(),
      title: z.string({ required_error: dic?.isRequired }).min(1, dic?.isRequired),
      titleen: z.string().optional(),
      titlede: z.string().optional(),
      tagline: z.string({ required_error: dic?.isRequired }).min(1, dic?.isRequired),
      taglineen: z.string().optional(),
      taglinede: z.string().optional(),
      description: z.string({ required_error: dic?.isRequired }).min(1, dic?.isRequired),
      descriptionen: z.string().optional(),
      descriptionde: z.string().optional(),
      keywords: z.string({ required_error: dic?.isRequired }).min(1, dic?.isRequired),
      keywordsen: z.string().optional(),
      keywordsde: z.string().optional(),
      logo: z.string().optional(),
      favicon: z.string().optional(),
      theme: z.string().optional(),
      siteUrl: z.string({ required_error: dic?.isRequired }).min(1, dic?.isRequired).url({
         message: dic?.isUrl,
      }),
      siteLang: z.string({ required_error: dic?.isRequired }).min(1, dic?.isRequired),
      siteAuthor: z.string({ required_error: dic?.isRequired }).min(1, dic?.isRequired),
      siteEmail: z.string({ required_error: dic?.isRequired }).min(1, dic?.isRequired).email({
         message: dic?.isEmail,
      }),
      sitePhone: z.string().optional(),
      siteAddress: z.string().optional(),
      address: z.string().optional(),
      addressen: z.string().optional(),
      addressde: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
      district: z.string().optional(),
      neighborhood: z.string().optional(),
      street: z.string().optional(),
      building: z.string().optional(),
      apartment: z.coerce.number({ invalid_type_error: dic?.isNumber }).nonnegative().optional(),
      floor: z.coerce.number({ invalid_type_error: dic?.isNumber }).nonnegative().optional(),
      zipCode: z.string().optional(),
      facebook: z.string().url({ message: dic?.isUrl }).optional().or(z.literal('')),
      twitter: z.string().url({ message: dic?.isUrl }).optional().or(z.literal('')),
      instagram: z.string().url({ message: dic?.isUrl }).optional().or(z.literal('')),
      linkedin: z.string().url({ message: dic?.isUrl }).optional().or(z.literal('')),
      youtube: z.string().url({ message: dic?.isUrl }).optional().or(z.literal('')),
      github: z.string().url({ message: dic?.isUrl }).optional().or(z.literal('')),
      gitlab: z.string().url({ message: dic?.isUrl }).optional().or(z.literal('')),
      pinterest: z.string().url({ message: dic?.isUrl }).optional().or(z.literal('')),
      reddit: z.string().url({ message: dic?.isUrl }).optional().or(z.literal('')),
      telegram: z.string().url({ message: dic?.isUrl }).optional().or(z.literal('')),
      whatsapp: z.string().url({ message: dic?.isUrl }).optional().or(z.literal('')),
      tiktok: z.string().url({ message: dic?.isUrl }).optional().or(z.literal('')),
      maintenance: z.boolean().optional(),
      maintenanceTitle: z.string().optional(),
      maintenanceTitleen: z.string().optional(),
      maintenanceTitlede: z.string().optional(),
      maintenanceDesc: z.string().optional(),
      maintenanceDescen: z.string().optional(),
      maintenanceDescde: z.string().optional(),
      maintenanceLogo: z.string().optional(),
      maintenanceAuthor: z.string().optional(),
      maintenanceLang: z.string().optional(),
      maintenanceTheme: z.string().optional(),
      maintenanceEmail: z.string().optional(),
      maintenancePhone: z.string().optional(),
      rSiteKey: z.string().optional(),
      rSecretKey: z.string().optional(),
      gAnalytics: z.string().optional(),
      gSearchConsole: z.string().optional(),
      tagManager: z.string().optional(),
      adsense: z.string().optional(),
      reCAPTCHAKeyId: z.string().optional(),
      yVerification: z.string().optional(),
      bVerification: z.string().optional(),
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

export const siteSettingSchema = (dic?: Dictionary<'siteSetting'>) => {
   return siteSettingSchemaBase(dic)
      .omit({})
      .superRefine((data, ctx) => {
         const titleMessage = dic?.isRequired || 'En az bir başlık alanı dolu olmalıdır';

         // Title alanlarının kontrolü
         if (!data.title && !data.titleen && !data.titlede) {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['title'], message: titleMessage });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['titleen'], message: titleMessage });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['titlede'], message: titleMessage });
         }
      });
};
export type SiteSettingSchema = z.infer<ReturnType<typeof siteSettingSchema>>;
