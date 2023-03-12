import { z, defineCollection } from 'astro:content';
const note = defineCollection({
  schema: z.object({
    title: z.string(),
    // author: z.string().optional(),
    author: z.enum(['John', 'Kevin']),
    description: z.string(),
    publishDate: z.string().transform((str) => new Date(str)),
  }),
});
export const collections = {
  note,
};
