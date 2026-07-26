import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const seo = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  socialImage: z.string().optional(),
}).optional();

const imageSlot = z.object({
  image: z.string().optional(),
  alt: z.string(),
  caption: z.string().optional(),
  shape: z.enum(['arch', 'circle', 'portrait', 'landscape', 'panorama', 'square']).default('landscape'),
});

const site = defineCollection({
  loader: glob({ pattern: 'site.json', base: './src/content' }),
  schema: z.object({
    name: z.string(),
    monogram: z.string(),
    strapline: z.string(),
    email: z.email(),
    canonicalUrl: z.url(),
    instagram: z.url(),
    facebook: z.url(),
    navigation: z.array(z.object({ label: z.string(), href: z.string() })),
    footer: z.string(),
    seo,
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    heroTitle: z.string(),
    introduction: z.string(),
    primaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
    secondaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
    featuredProjects: z.array(z.string()).default([]),
    featuredGallery: z.string().optional(),
    featuredEvent: z.string().optional(),
    hero: imageSlot.optional(),
    seo,
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    featured: z.boolean().default(false),
    order: z.number(),
    hero: imageSlot,
    gallery: z.array(imageSlot).default([]),
    relatedGallery: z.string().optional(),
    seo,
  }),
});

const galleries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/galleries' }),
  schema: z.object({
    title: z.string(),
    introduction: z.string(),
    order: z.number(),
    cover: imageSlot,
    photos: z.array(imageSlot).default([]),
    seo,
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    venue: z.string(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    dateLabel: z.string().optional(),
    image: imageSlot,
    bookingLink: z.url().optional(),
    published: z.boolean().default(true),
    seo,
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
    postageNote: z.string(),
    options: z.array(z.string()).default([]),
    previews: z.array(imageSlot).default([]),
    enquiryLabel: z.string(),
    order: z.number(),
    seo,
  }),
});

export const collections = { site, pages, projects, galleries, events, products };
