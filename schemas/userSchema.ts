import { z } from 'zod';

import { ZodIssueCode } from 'zod';
import { Dictionary } from '@/components/dictionary/getDictionary';
import { schemaBase } from './schemaBase';

////// userSchema ////////
export const userSchema = (dic?: Dictionary<'schemaBase'>) => {
   return schemaBase(dic).pick({
      id: true,
      name: true,
      email: true,
      phone: true,
      firstName: true,
      lastName: true,
      bio: true,
      password: true,
      confirmPassword: true,
      oldPassword: true,
      emailVerified: true,
      image: true,
      address: true,
      city: true,
      country: true,
      role: true,
      status: true,
      statuses: true,
      facebook: true,
      twitter: true,
      instagram: true,
      linkedin: true,
      youtube: true,
      github: true,
      gitlab: true,
      pinterest: true,
      reddit: true,
      telegram: true,
      whatsapp: true,
      tiktok: true,
      createdAt: true,
      updatedAt: true,
      agreeToTerms: true,
      createdById: true,
      updatedById: true,
      social: true,
   });
};
export type UserSchema = z.infer<ReturnType<typeof userSchema>>;

// Social media update schema
export const socialMediaUpdateSchema = (dic?: Dictionary<'schemaBase'>) => {
   return schemaBase(dic).pick({
      facebook: true,
      twitter: true,
      instagram: true,
      linkedin: true,
      youtube: true,
      github: true,
      gitlab: true,
      pinterest: true,
      reddit: true,
      telegram: true,
      whatsapp: true,
      tiktok: true,
   });
};
export type SocialMediaUpdateSchema = z.infer<ReturnType<typeof socialMediaUpdateSchema>>;

///////// addUserSchema //////////
export const addUserSchema = (dic?: Dictionary<'schemaBase'>) => {
   return schemaBase(dic)
      .pick({
         id: true,
         email: true,
         firstName: true,
         lastName: true,
         password: true,
         confirmPassword: true,
         phone: true,
         address: true,
         city: true,
         country: true,
         role: true,
         status: true,
         statuses: true,
         bio: true,
         agreeToTerms: true,
      })
      .superRefine((data, ctx) => {
         if (data.firstName === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['firstName'],
               message: dic?.firstNameEnter,
            });
         }
         if (data.lastName === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['lastName'],
               message: dic?.lastNameEnter,
            });
         }
         if (data.email === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['email'],
               message: dic?.emailEnter,
            });
         }
         if (data.password === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['password'],
               message: dic?.ispassword,
            });
         }
         if (data.confirmPassword === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['confirmPassword'],
               message: dic?.ispassword,
            });
         }
         if (data.password !== data.confirmPassword) {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['confirmPassword'],
               message: dic?.passwordNotMatch,
            });
         }
      });
};
export type AddUserSchema = z.infer<ReturnType<typeof addUserSchema>>;

///////// addUserSchema //////////
export const updateUserSchema = (dic?: Dictionary<'schemaBase'>) => {
   return schemaBase(dic)
      .pick({
         id: true,
         email: true,
         firstName: true,
         lastName: true,
         password: true,
         confirmPassword: true,
         phone: true,
         address: true,
         city: true,
         country: true,
         role: true,
         status: true,
         statuses: true,
         bio: true,
         agreeToTerms: true,
      })
      .superRefine((data, ctx) => {
         if (data.firstName === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['firstName'],
               message: dic?.firstNameEnter,
            });
         }
         if (data.lastName === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['lastName'],
               message: dic?.lastNameEnter,
            });
         }
         if (data.email === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['email'],
               message: dic?.emailEnter,
            });
         }
         if (data.password !== '' || data.confirmPassword !== '') {
            if (data.password !== data.confirmPassword) {
               ctx.addIssue({
                  code: ZodIssueCode.custom,
                  path: ['confirmPassword'],
                  message: dic?.passwordNotMatch,
               });
            }
         }
      });
};
export type UpdateUserSchema = z.infer<ReturnType<typeof updateUserSchema>>;

/////// Login şeması ////////
export const loginSchema = (dic?: Dictionary<'schemaBase'>) => {
   return schemaBase(dic)
      .pick({
         email: true,
         password: true,
      })
      .superRefine((data, ctx) => {
         if (data.email === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['email'],
               message: dic?.emailEnter,
            });
         }
         if (data.password === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['password'],
               message: dic?.passwordEnter,
            });
         }
      });
};
export type LoginSchema = z.infer<ReturnType<typeof loginSchema>>;

// Password ResChange şeması

export const passwordChangeSchema = (dic?: Dictionary<'schemaBase'>) => {
   return schemaBase(dic)
      .pick({
         oldPassword: true,
         password: true,
         confirmPassword: true,
      })
      .superRefine((data, ctx) => {
         if (data.oldPassword.length < 1) {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['oldPassword'],
               message: dic?.passwordEnter,
            });
         }
         if (data.password === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['password'],
               message: dic?.ispassword,
            });
         }
         if (data.confirmPassword === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['confirmPassword'],
               message: dic?.ispassword,
            });
         }
         if (data.password !== data.confirmPassword) {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['confirmPassword'],
               message: dic?.passwordNotMatch,
            });
         }
      });
};

export type PasswordChangeSchema = z.infer<ReturnType<typeof passwordChangeSchema>>;

///// profile update schema //////
export const profileUpdateSchema = (dic?: Dictionary<'schemaBase'>) => {
   return schemaBase(dic)
      .pick({
         firstName: true,
         lastName: true,
         email: true,
         phone: true,
         address: true,
         city: true,
         country: true,
         bio: true,
      })
      .superRefine((data, ctx) => {
         if (data.firstName === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['firstName'],
               message: dic?.firstNameEnter,
            });
         }
         if (data.lastName === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['lastName'],
               message: dic?.lastNameEnter,
            });
         }
         if (data.email === '') {
            ctx.addIssue({
               code: ZodIssueCode.custom,
               path: ['email'],
               message: dic?.emailEnter,
            });
         }
      });
};
export type ProfileUpdateSchema = z.infer<ReturnType<typeof profileUpdateSchema>>;

export const userSessionSchema = z.object({
   id: z.string().optional().nullable(),
   name: z.string().optional().nullable(),
   email: z.string().optional().nullable(),
   firstName: z.string().optional().nullable(),
   lastName: z.string().optional().nullable(),
   role: z.string().optional().nullable(),
   image: z.string().optional().nullable(),
});

export type UserSessionSchema = z.infer<typeof userSessionSchema>;
