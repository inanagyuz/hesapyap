import { z } from 'zod';
import { ZodIssueCode } from 'zod';
import { Dictionary } from '@/components/dictionary/getDictionary';
import { role, transactionType, installmentStatus } from './schemaBase';

export const budgetSchema = (dic?: Dictionary<'schemaBase'>) => {
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
      image: z.string().optional(),
      icon: z.string().nullable().optional(),
      code: z.string().optional(),
      symbol: z.string().optional(),
      status: z
         .boolean({
            invalid_type_error: dic ? dic?.isBoolean : '',
         })
         .optional(),
      access: z.array(role).default([]),
      userId: z.string().nullable().optional(),
      user: z
         .object({
            firstName: z.string().optional(),
            lastName: z.string().optional(),
            email: z.string().optional(),
            role: role.optional(),
            image: z.string().optional(),
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
            icon: z.string().nullable().optional(),
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
      url: z.string().optional(),
      urlen: z.string().optional(),
      urlde: z.string().optional(),
      categoryType: transactionType.optional().nullable(),
      categoryId: z.union([z.string().nullish(), z.literal('')]),
      category: z
         .object({
            id: z.string().optional(),
            title: z.string().optional(),
            titleen: z.string().optional(),
            titlede: z.string().optional(),
         })
         .optional(),
   });
};
export type BudgetSchema = z.infer<ReturnType<typeof budgetSchema>>;

export const bankSchema = (dic?: Dictionary<'schemaBase'>) => {
   return budgetSchema(dic)
      .pick({
         id: true,
         name: true,
         nameen: true,
         namede: true,
         desc: true,
         descen: true,
         descde: true,
         image: true,
         status: true,
         access: true,
      })
      .superRefine((data, ctx) => {
         const message = dic?.isRequried;
         // Name alanlarının kontrolü
         if (!data.name && !data.nameen && !data.namede) {
            if (data.name === '' && data.nameen === '' && data.namede === '') {
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['name'], message: message });
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['nameen'], message: message });
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['namede'], message: message });
            }
         }
      });
};
export type BankSchema = z.infer<ReturnType<typeof bankSchema>>;

export const budgetAccountTypeSchema = (dic?: Dictionary<'schemaBase'>) => {
   return budgetSchema(dic)
      .pick({
         id: true,
         title: true,
         titleen: true,
         titlede: true,
         desc: true,
         descen: true,
         descde: true,
         icon: true,
         status: true,
         access: true,
         url: true,
      })
      .superRefine((data, ctx) => {
         const message = dic?.isRequried;
         // Name alanlarının kontrolü
         if (!data.title && !data.titlede && !data.titlede) {
            if (data.title === '' && data.titleen === '' && data.titlede === '') {
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['title'], message: message });
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['titleen'], message: message });
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['titlede'], message: message });
            }
         }
      });
};
export type BudgetAccountTypeSchema = z.infer<ReturnType<typeof budgetAccountTypeSchema>>;

/// currency schema
export const currencySchema = (dic?: Dictionary<'schemaBase'>) => {
   return budgetSchema(dic)
      .pick({
         id: true,
         name: true,
         nameen: true,
         namede: true,
         code: true,
         symbol: true,
         status: true,
         access: true,
      })
      .superRefine((data, ctx) => {
         const message = dic?.isRequried;
         // Name alanlarının kontrolü
         if (!data.name && !data.nameen && !data.namede) {
            if (data.name === '' && data.nameen === '' && data.namede === '') {
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['name'], message: message });
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['nameen'], message: message });
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['namede'], message: message });
            }
         }
      });
};
export type CurrencySchema = z.infer<ReturnType<typeof currencySchema>>;

/// Category schema ////
export const budgetCategorySchema = (dic?: Dictionary<'schemaBase'>) => {
   return budgetSchema(dic)
      .pick({
         id: true,
         title: true,
         titleen: true,
         titlede: true,
         desc: true,
         descen: true,
         descde: true,
         categoryType: true,
         icon: true,
         status: true,
         access: true,
      })
      .superRefine((data, ctx) => {
         const message = dic?.isRequried;
         // Name alanlarının kontrolü
         if (!data.title && !data.titlede && !data.titlede) {
            if (data.title === '' && data.titleen === '' && data.titlede === '') {
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['title'], message: message });
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['titleen'], message: message });
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['titlede'], message: message });
            }
         }
      });
};
export type BudgetCategorySchema = z.infer<ReturnType<typeof budgetCategorySchema>>;

/// Credit Type schema ////
export const creditTypeSchema = (dic?: Dictionary<'schemaBase'>) => {
   return budgetSchema(dic)
      .pick({
         id: true,
         title: true,
         titleen: true,
         titlede: true,
         desc: true,
         descen: true,
         descde: true,
         icon: true,
         status: true,
         access: true,
      })
      .superRefine((data, ctx) => {
         const message = dic?.isRequried;
         // Name alanlarının kontrolü
         if (!data.title && !data.titlede && !data.titlede) {
            if (data.title === '' && data.titleen === '' && data.titlede === '') {
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['title'], message: message });
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['titleen'], message: message });
               ctx.addIssue({ code: ZodIssueCode.custom, path: ['titlede'], message: message });
            }
         }
      });
};
export type CreditTypeSchema = z.infer<ReturnType<typeof creditTypeSchema>>;

//// Budget Schema ////
export const budgetsSchema = (dic?: Dictionary<'schemaBase'>) => {
   return budgetSchema(dic)
      .pick({
         id: true,
         title: true,
         desc: true,
         icon: true,
         currencyId: true,
         status: true,
      })
      .superRefine((data, ctx) => {
         const message = dic?.isRequried;
         // Title alanlarının kontrolü
         if (!data.title && data.title === '') {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['title'], message: message });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['titleen'], message: message });
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['titlede'], message: message });
         }
         if (!data.currencyId && data.currencyId === '') {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['currencyId'], message: message });
         }
      });
};
export type BudgetsSchema = z.infer<ReturnType<typeof budgetsSchema>>;

/// Budget Account Schema ////
export const budgetAccountSchema = (dic?: Dictionary<'schemaBase'>) => {
   return budgetSchema(dic)
      .pick({
         id: true,
         title: true,
         desc: true,
         balance: true,
         icon: true,
         currencyId: true,
         currency: true,
         status: true,
         budgetId: true,
         accountTypeId: true,
      })
      .superRefine((data, ctx) => {
         const message = dic?.isRequried;
         // Title alanlarının kontrolü
         if (!data.title && data.title === '') {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['title'], message: message });
         }
         if (!data.currencyId && data.currencyId === '') {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['currencyId'], message: message });
         }
         if (!data.budgetId && data.budgetId === '') {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['budgetId'], message: message });
         }
         if (!data.accountTypeId && data.accountTypeId === '') {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['accountTypeId'], message: message });
         }
      });
};
export type BudgetAccountSchema = z.infer<ReturnType<typeof budgetAccountSchema>>;

/// BudgetTransaction Schema ////
export const budgetTransactionSchema = (dic?: Dictionary<'schemaBase'>) => {
   return budgetSchema(dic)
      .pick({
         id: true,
         desc: true,
         amount: true,
         transactionDate: true,
         transactionType: true,
         icon: true,
         currencyId: true,
         currency: true,
         categoryId: true,
         category: true,
         budgetAccountId: true,
         budgetAccountId2: true,
         budgetAccount: true,
         userId: true,
         status: true,
         parentTransactionId: true,
      })
      .superRefine((data, ctx) => {
         const message = dic?.isRequried;
         // Title alanlarının kontrolü
         if (!data.currencyId || data.currencyId === '') {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['currencyId'], message: message });
         }
         if (!data.categoryId || data.categoryId === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['categoryId'],
               message: message,
            });
         }
         if (!data.budgetAccountId || data.budgetAccountId === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['budgetAccountId'],
               message: message,
            });
         }
      });
};
export type BudgetTransactionSchema = z.infer<ReturnType<typeof budgetTransactionSchema>>;

export const creditSchema = (dic?: Dictionary<'schemaBase'>) => {
   return budgetSchema(dic)
      .pick({
         id: true,
         title: true,
         desc: true,
         interestRate: true,
         principalAmount: true,
         installmentCount: true,
         installmentAmount: true,
         otherCost: true,
         costAmount: true,
         totalAmount: true,
         currencyId: true,
         currency: true,
         creditTypeId: true,
         creditType: true,
         icon: true,
         bankId: true,
         bank: true,
         status: true,
         startDate: true,
         endDate: true,
      })
      .superRefine((data, ctx) => {
         const message = dic?.isRequried;

         if (!data.title) {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['title'], message: message });
         }
         if (!data.currencyId) {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['currencyId'], message: message });
         }
         if (!data.bankId) {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['bankId'], message: message });
         }
         if (!data.creditTypeId) {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['creditTypeId'], message: message });
         }
      });
};
export type CreditSchema = z.infer<ReturnType<typeof creditSchema>>;

export const creditInstallmentSchema = (dic?: Dictionary<'schemaBase'>) => {
   return budgetSchema(dic)
      .pick({
         id: true,
         creditId: true,
         installmentDate: true,
         installmentStatus: true,
         status: true,
         icon: true,
         interestAmount: true,
         principalAmount: true,
         KKDFAmount: true,
         BSMVAmount: true,
         totalAmount: true,
      })
      .superRefine((data, ctx) => {
         const message = dic?.isRequried;
         // Title alanlarının kontrolü
         if (!data.totalAmount && data.totalAmount === 0) {
            ctx.addIssue({ code: ZodIssueCode.custom, path: ['totalAmount'], message: message });
         }
      });
};
export type CreditInstallmentSchema = z.infer<ReturnType<typeof creditInstallmentSchema>>;
