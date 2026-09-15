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
    logo: z.string(),
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

const shared = defineCollection({
  loader: glob({ pattern: 'shared.json', base: './src/content' }),
  schema: z.object({
    skipLink: z.string(),
    header: z.object({
      homeLabel: z.string(),
      brandLineOne: z.string(),
      brandLineTwo: z.string(),
      menuLabel: z.string(),
      navigationLabel: z.string(),
      primaryNavigationLabel: z.string(),
    }),
    footer: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      instagramLabel: z.string(),
      facebookLabel: z.string(),
    }),
    imagePlaceholder: z.object({
      status: z.string(),
      shapeLabels: z.object({
        arch: z.string(),
        circle: z.string(),
        portrait: z.string(),
        landscape: z.string(),
        panorama: z.string(),
        square: z.string(),
      }),
    }),
    form: z.object({
      nameLabel: z.string(),
      emailLabel: z.string(),
      itemLabel: z.string(),
      presentationLabel: z.string(),
      presentationOptions: z.array(z.string()),
      frameLabel: z.string(),
      frameOptions: z.array(z.string()),
      quantityLabel: z.string(),
      topicLabel: z.string(),
      topicOptions: z.array(z.string()),
      contactMessageLabel: z.string(),
      productMessageLabel: z.string(),
      contactSubmitLabel: z.string(),
      copyButtonLabel: z.string(),
      helpText: z.string(),
      emailReadyStatus: z.string(),
      copySuccessStatus: z.string(),
      copyFailureStatus: z.string(),
      email: z.object({
        productSubjectPrefix: z.string(),
        contactSubjectPrefix: z.string(),
        contactSubjectFallback: z.string(),
        nameLabel: z.string(),
        replyToLabel: z.string(),
        itemLabel: z.string(),
        interestLabel: z.string(),
        presentationLabel: z.string(),
        frameLabel: z.string(),
        quantityLabel: z.string(),
      }),
    }),
  }),
});

const cta = z.object({ label: z.string(), href: z.string() });
const pageHero = {
  eyebrow: z.string(),
  heroTitle: z.string(),
  introduction: z.string(),
  seo,
};

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.discriminatedUnion('title', [
    z.object({
      title: z.literal('Home'),
      ...pageHero,
      primaryCta: cta,
      secondaryCta: cta,
      featuredProjects: z.array(z.string()).default([]),
      featuredGallery: z.string(),
      hero: imageSlot.optional(),
      scrollCue: z.string(),
      introductionLabel: z.string(),
      introductionHeading: z.string(),
      introductionText: z.string(),
      introductionLink: cta,
      introductionImage: imageSlot,
      lensKicker: z.string(),
      lensHeading: z.string(),
      lensNote: z.string(),
      lensImage: imageSlot,
      projectsEyebrow: z.string(),
      projectsHeading: z.string(),
      projectsLink: cta,
      eventLabel: z.string(),
      eventEyebrow: z.string(),
      eventWhenLabel: z.string(),
      eventWhereLabel: z.string(),
      eventLink: cta,
      galleryEyebrow: z.string(),
      galleryHeading: z.string(),
      galleryLink: cta,
    }),
    z.object({
      title: z.literal('About'),
      ...pageHero,
      hero: imageSlot.optional(),
      bodyLabel: z.string(),
    }),
    z.object({
      title: z.literal('Contact'),
      ...pageHero,
      directEmailLabel: z.string(),
      formSubmitLabel: z.string(),
    }),
    z.object({
      title: z.literal('Projects'),
      ...pageHero,
      cardLinkLabel: z.string(),
      cardAriaPrefix: z.string(),
      detailPrefix: z.string(),
      storyLabel: z.string(),
      photographsLabel: z.string(),
      navigationLabel: z.string(),
      previousLabel: z.string(),
      indexLabel: z.string(),
      allProjectsLabel: z.string(),
      nextLabel: z.string(),
    }),
    z.object({
      title: z.literal('Gallery'),
      ...pageHero,
      detailPrefix: z.string(),
      photographsLabel: z.string(),
      navigationLabel: z.string(),
      previousLabel: z.string(),
      indexLabel: z.string(),
      allGalleriesLabel: z.string(),
      nextLabel: z.string(),
    }),
    z.object({
      title: z.literal('Events'),
      ...pageHero,
      upcomingHeading: z.string(),
      venueLabel: z.string(),
      bookingLabel: z.string(),
      interestLabel: z.string(),
      emptyMessage: z.string(),
      archiveHeading: z.string(),
    }),
    z.object({
      title: z.literal('Shop'),
      ...pageHero,
      itemPrefix: z.string(),
      orderEmailLabel: z.string(),
    }),
    z.object({
      title: z.literal('Not Found'),
      eyebrow: z.string(),
      heroTitle: z.string(),
      introduction: z.string(),
      primaryCta: cta,
      secondaryCta: cta,
      seo,
    }),
  ]),
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

export const collections = { site, shared, pages, projects, galleries, events, products };
