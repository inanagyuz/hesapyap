import { z } from 'zod';
import { Dictionary } from '@/components/dictionary/getDictionary';

export const role = z.enum(['ADMIN', 'PUBLISHER', 'USER', 'VISITOR', 'GUEST']);
export const statuses = z.enum(['ACTIVE', 'INACTIVE', 'BANNED']);
export const location = z.enum([
   'null',
   'SIDEBARPOSITION',
   'HEADERPOSITION',
   'FOOTERPOSITION',
   'ADMINPOSITION',
   'NAVSECONDARY',
]);
export const transactionType = z.enum(['INCOME', 'EXPENSE', 'TRANSFER']);
export const installmentStatus = z.enum(['PAID', 'UNPAID', 'OVERDUE']);

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const schemaBase = (dic?: Dictionary<'schemaBase'>) => {
   return z.object({
      id: z.string().optional(),
      title: z.string().optional(),
      titleen: z.string().optional(),
      titlede: z.string().optional(),
      name: z.string().optional(),
      nameen: z.string().optional(),
      namede: z.string().optional(),
      desc: z.string().optional(),
      descen: z.string().optional(),
      descde: z.string().optional(),
      slug: z.string().optional(),
      slugen: z.string().optional(),
      slugde: z.string().optional(),
      content: z.any().optional(),
      contenten: z.any().optional(),
      contentde: z.any().optional(),
      keywords: z.string().optional(),
      keywordsen: z.string().optional(),
      keywordsde: z.string().optional(),
      url: z.string().optional(),
      urlen: z.string().optional(),
      urlde: z.string().optional(),
      code: z.string().optional(),
      symbol: z.string().optional(),
      icon: z.string().optional(),
      views: z.number().optional(),
      image: z.string().optional(),
      images: z.array(z.string()).optional(),
      role: role.optional(),
      status: z
         .boolean({
            invalid_type_error: dic ? dic?.isBoolean : '',
         })
         .optional(),
      statuses: statuses.optional().nullable(),
      access: z.array(role).default([]),
      user: z
         .object({
            firstName: z.string().optional(),
            lastName: z.string().optional(),
            email: z.string().optional(),
            role: role.optional(),
            image: z.string().optional(),
         })
         .optional(),
      userId: z.string().nullable().optional(),
      categoryId: z.union([z.string().nullish(), z.literal('')]),
      category: z
         .object({
            id: z.string().optional(),
            title: z.string().optional(),
            titleen: z.string().optional(),
            titlede: z.string().optional(),
         })
         .optional(),
      categoryType: transactionType.optional().nullable(),
      parentId: z.union([z.string().nullish(), z.literal('')]),
      pageUrlId: z.union([z.string().nullish(), z.literal('')]),
      pageUrl: z
         .object({
            slug: z.string().optional(),
            slugen: z.string().optional(),
            slugde: z.string().optional(),
         })
         .optional(),
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
      informationId: z.string().nullable().optional(),
      component: z.string().nullable().optional(),
      createdView: z.boolean().optional(),
      updatedView: z.boolean().optional(),
      authorView: z.boolean().optional(),
      viewsView: z.boolean().optional(),
      menuLinks: z.array(z.string()).optional(),
      menuId: z.string().nullable(),
      order: z.coerce
         .number({ invalid_type_error: dic?.isNumber })
         .positive({ message: dic?.isPositiveNumber })
         .optional(),
      location: location.optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      bio: z.string().optional(),
      email: z
         .union([z.string().regex(emailRegex, { message: dic?.isEmail }), z.literal('')])
         .optional(),
      phone: z.union([z.string().regex(phoneRegex, { message: dic?.phoneError }), z.literal('')]),
      password: z.union([
         z
            .string()
            .min(6, { message: dic?.minLengthPassword })
            .max(24, { message: dic?.maxLengthPassword }),
         z.literal(''),
      ]),
      confirmPassword: z.union([
         z
            .string()
            .min(6, { message: dic?.minLengthPassword })
            .max(24, { message: dic?.maxLengthPassword }),
         z.literal(''),
      ]),
      oldPassword: z.string(),
      emailVerified: z.date().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      facebook: z.union([z.string().url({ message: dic?.facebookUrlError }), z.literal('')]),
      twitter: z.union([z.string().url({ message: dic?.twitterUrlError }), z.literal('')]),
      instagram: z.union([z.string().url({ message: dic?.instagramUrlError }), z.literal('')]),
      linkedin: z.union([z.string().url({ message: dic?.linkedinUrlError }), z.literal('')]),
      youtube: z.union([z.string().url({ message: dic?.youtubeUrlError }), z.literal('')]),
      github: z.union([z.string().url({ message: dic?.githubUrlError }), z.literal('')]),
      gitlab: z.union([z.string().url({ message: dic?.gitlabUrlError }), z.literal('')]),
      pinterest: z.union([z.string().url({ message: dic?.pinterestUrlError }), z.literal('')]),
      reddit: z.union([z.string().url({ message: dic?.redditUrlError }), z.literal('')]),
      telegram: z.union([z.string().url({ message: dic?.telegramUrlError }), z.literal('')]),
      whatsapp: z.union([z.string().url({ message: dic?.whatsappUrlError }), z.literal('')]),
      tiktok: z.union([z.string().url({ message: dic?.tiktokUrlError }), z.literal('')]),
      social: z
         .object({
            facebook: z.union([z.string().url({ message: dic?.facebookUrlError }), z.literal('')]),
            twitter: z.union([z.string().url({ message: dic?.twitterUrlError }), z.literal('')]),
            instagram: z.union([
               z.string().url({ message: dic?.instagramUrlError }),
               z.literal(''),
            ]),
            linkedin: z.union([z.string().url({ message: dic?.linkedinUrlError }), z.literal('')]),
            youtube: z.union([z.string().url({ message: dic?.youtubeUrlError }), z.literal('')]),
            github: z.union([z.string().url({ message: dic?.githubUrlError }), z.literal('')]),
            gitlab: z.union([z.string().url({ message: dic?.gitlabUrlError }), z.literal('')]),
            pinterest: z.union([
               z.string().url({ message: dic?.pinterestUrlError }),
               z.literal(''),
            ]),
            reddit: z.union([z.string().url({ message: dic?.redditUrlError }), z.literal('')]),
            telegram: z.union([z.string().url({ message: dic?.telegramUrlError }), z.literal('')]),
            whatsapp: z.union([z.string().url({ message: dic?.whatsappUrlError }), z.literal('')]),
            tiktok: z.union([z.string().url({ message: dic?.tiktokUrlError }), z.literal('')]),
         })
         .optional(),
      agreeToTerms: z.boolean().optional(),
      deletedById: z.string().optional(),
      currencyId: z.string().optional(),
      currency: z
         .object({
            code: z.string().optional(),
            symbol: z.string().optional(),
            name: z.string().optional(),
            nameen: z.string().optional(),
            namede: z.string().optional(),
         })
         .optional(),
      bankId: z.string().optional(),
      balance: z.coerce
         .number({ invalid_type_error: dic?.isNumber, message: dic?.isNumber })
         .optional(),
      amount: z.coerce.number({ invalid_type_error: dic?.isNumber }).optional(),
      budgetId: z.string().optional(),
      accountTypeId: z.string().optional(),
      budgetAccountId: z.string().optional().optional(),
      budgetAccountId2: z.string().nullable().optional(),
      budgetAccount: z
         .object({
            id: z.string().optional(),
            title: z.string().optional(),
            desc: z.string().optional(),
         })
         .optional(),
      transactionDate: z.preprocess((arg) => {
         if (!arg) return new Date();
         if (typeof arg === 'string' || arg instanceof Date) {
            return new Date(arg);
         }
      }, z.date({ invalid_type_error: dic?.isDate })),
      transactionType: transactionType.optional().nullable(),
      parentTransactionId: z.string().nullable().optional(),
      interestRate: z.coerce
         .number({ invalid_type_error: dic?.isNumber, message: dic?.isNumber })
         .optional(),
      principalAmount: z.coerce
         .number({ invalid_type_error: dic?.isNumber, message: dic?.isNumber })
         .optional(),
      installmentCount: z.coerce
         .number({ invalid_type_error: dic?.isNumber, message: dic?.isNumber })
         .optional(),
      installmentAmount: z.coerce
         .number({ invalid_type_error: dic?.isNumber, message: dic?.isNumber })
         .optional(),
      taxAmount: z.coerce
         .number({ invalid_type_error: dic?.isNumber, message: dic?.isNumber })
         .optional(),
      costAmount: z.coerce
         .number({ invalid_type_error: dic?.isNumber, message: dic?.isNumber })
         .optional(),
      otherCost: z.coerce
         .number({ invalid_type_error: dic?.isNumber, message: dic?.isNumber })
         .optional(),
      totalAmount: z.coerce
         .number({ invalid_type_error: dic?.isNumber, message: dic?.isNumber })
         .optional(),
      creditTypeId: z.string().optional(),
      creditType: z
         .object({
            id: z.string().optional(),
            title: z.string().optional(),
            titleen: z.string().optional(),
            titlede: z.string().optional(),
         })
         .optional(),
      bank: z
         .object({
            id: z.string().optional(),
            name: z.string().optional(),
            nameen: z.string().optional(),
            namede: z.string().optional(),
            icon: z.string().optional(),
         })
         .optional(),
      creditId: z.string().optional(),
      installmentStatus: installmentStatus.optional(),
      installmentDate: z.preprocess((arg) => {
         if (!arg) return new Date();
         if (typeof arg === 'string' || arg instanceof Date) {
            return new Date(arg);
         }
      }, z.date({ invalid_type_error: dic?.isDate })),
      interestAmount: z.coerce
         .number({ invalid_type_error: dic?.isNumber, message: dic?.isNumber })
         .optional(),
      KKDFAmount: z.coerce
         .number({ invalid_type_error: dic?.isNumber, message: dic?.isNumber })
         .optional(),
      BSMVAmount: z.coerce
         .number({ invalid_type_error: dic?.isNumber, message: dic?.isNumber })
         .optional(),
      startDate: z.preprocess((arg) => {
         if (!arg) return new Date();
         if (typeof arg === 'string' || arg instanceof Date) {
            return new Date(arg);
         }
      }, z.date({ invalid_type_error: dic?.isDate })),
      endDate: z.preprocess((arg) => {
         if (!arg) return new Date();
         if (typeof arg === 'string' || arg instanceof Date) {
            return new Date(arg);
         }
      }, z.date({ invalid_type_error: dic?.isDate })),
   });
};

export type SchemaBase = z.infer<ReturnType<typeof schemaBase>>;
