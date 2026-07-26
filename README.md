# Heritage Buildings Photographer

A static Astro website for an independent architectural heritage photography practice. Content is managed in Git through Pages CMS; uploaded photographs are stored in `public/media/images`.

## Local development

```sh
npm install
npm run dev
```

Production validation:

```sh
npm run build
npm run test:routes
```

## Content editing

Connect the GitHub repository to [Pages CMS](https://pagescms.org). The root `.pages.yml` exposes protected site, homepage and about settings plus collections for projects, galleries, events and products. Image slots can remain empty and render as designed placeholders until final photography and alt text are supplied.

## Cloudflare Pages

Use the Astro framework preset:

- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

The site is fully static, so no Cloudflare adapter or runtime variables are required.
