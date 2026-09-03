# Heritage Building Photographer

A static Astro website for a photographer documenting historic buildings in Doncaster, other towns and cities, and abroad. Content is managed in Git through Pages CMS; uploaded photographs are stored in `public/media/images`.

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

Connect the GitHub repository to [Pages CMS](https://pagescms.org). The root `.pages.yml` provides plain-language editors for the site settings, shared wording, every fixed page, projects, galleries, events and products. The main page layouts are intentionally fixed, while new projects, galleries, events and products can be added as collection entries.

### Editing a page

1. Open **Main pages** in Pages CMS and choose the page.
2. Change the labelled text, links or search-and-social fields. No Markdown or code editing is required.
3. Save the entry. Pages CMS creates a Git commit, and a commit on `main` starts the existing GitHub Pages deployment.

Shared header, footer, form and empty-image wording is under **Site → Shared wording**. Contact details, social links and the main navigation are under **Site → Site settings**.

### Uploading or replacing a photograph

1. Open the page, project, gallery, event or product containing the photograph.
2. In its **Image file** field, choose an existing image from **Photo library** or upload a JPG, JPEG, PNG, WebP or AVIF.
3. Replace the placeholder description with a short, truthful description of what is visible. The caption is optional; the frame shape controls the presentation.
4. Save the entry and wait for the GitHub Pages deployment to complete.

To replace a photograph, upload and select the new file before removing the old file from **Photo library**. Only delete an old image after checking that no other entry uses it. Web-sized JPG or WebP files, roughly 2,500 pixels on the longest edge, will keep uploads and pages manageable.

Image slots can remain empty and render as designed placeholders until final photography and descriptions are supplied.

## Cloudflare Pages

Use the Astro framework preset:

- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

The site is fully static, so no Cloudflare adapter or runtime variables are required.

## GitHub Pages

The included `.github/workflows/deploy.yml` builds and deploys the site whenever `main` is pushed. In the repository’s **Settings → Pages**, set **Source** to **GitHub Actions**. Do not select “Deploy from a branch”: `main` contains the Astro source, while the workflow publishes the generated `dist` artifact.

GitHub Actions automatically builds with the `/HeritagePhotography` base path for:

`https://scruffyhipster.github.io/HeritagePhotography/`
