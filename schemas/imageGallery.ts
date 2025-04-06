import { z } from 'zod';

export const imageGallerySchemaBase = () => {
   return z.object({
      id: z.string().optional(),
      name: z.string().optional(),
      url: z.string().optional(),
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

export type ImageGallerySchema = z.infer<ReturnType<typeof imageGallerySchemaBase>>;
