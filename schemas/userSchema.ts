import { z } from 'zod';

import { ZodIssueCode } from 'zod';
import { Dictionary } from '@/components/dictionary/getDictionary';
import { schemaBase, role, emailRegex, phoneRegex, statuses } from './schemaBase';

////// userSchema ////////
export const userSchema = (dic?: Dictionary<'schemaBase'>) => {
   return z.object({
      id: z.string().optional(),
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
      status: z
         .boolean({
            invalid_type_error: dic ? dic?.isBoolean : '',
         })
         .optional(),
      statuses: statuses.optional().nullable(),
      access: z.array(role).default([]),
      oldPassword: z.string(),
      emailVerified: z.date().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      role: role.optional(),
      agreeToTerms: z.boolean().optional(),
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
   });
   // return schemaBase(dic).pick({
   //    id: true,
   //    name: true,
   //    email: true,
   //    phone: true,
   //    firstName: true,
   //    lastName: true,
   //    bio: true,
   //    password: true,
   //    confirmPassword: true,
   //    oldPassword: true,
   //    emailVerified: true,
   //    image: true,
   //    address: true,
   //    city: true,
   //    country: true,
   //    role: true,
   //    status: true,
   //    statuses: true,
   //    facebook: true,
   //    twitter: true,
   //    instagram: true,
   //    linkedin: true,
   //    youtube: true,
   //    github: true,
   //    gitlab: true,
   //    pinterest: true,
   //    reddit: true,
   //    telegram: true,
   //    whatsapp: true,
   //    tiktok: true,
   //    createdAt: true,
   //    updatedAt: true,
   //    agreeToTerms: true,
   //    createdById: true,
   //    updatedById: true,
   //    social: true,
   // });
};
export type UserSchema = z.infer<ReturnType<typeof userSchema>>;

// Social media update schema
export const socialMediaUpdateSchema = (dic?: Dictionary<'schemaBase'>) => {
   return userSchema(dic).pick({
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
   return userSchema(dic)
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
   return userSchema(dic)
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
