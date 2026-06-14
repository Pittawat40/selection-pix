# Selection-Pix — Nuxt SSG Portfolio

Real estate & architectural photography portfolio built with **Nuxt 3 + Tailwind CSS**, configured for Static Site Generation (SSG).

## Tech Stack

- **Nuxt 3** — Vue framework with file-based routing
- **Tailwind CSS** — utility-first CSS
- **SSG** — `nuxt generate` outputs static HTML/CSS/JS
- **TypeScript** — type-safe composables

## Project Structure

```
panoramic-studio/
├── app.vue                        # Root component
├── nuxt.config.ts                 # Nuxt + SSG config
├── tailwind.config.ts             # Tailwind config
├── assets/css/main.css            # Global styles
├── composables/
│   └── useProjects.ts             # Project data + types
├── layouts/
│   └── default.vue                # Nav + Footer layout
└── pages/
    ├── index.vue                  # Home: hero + grid
    └── project/
        └── [slug].vue             # Project detail page
```

## Getting Started

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Generate static site → ./dist
npm run generate

# Preview generated site
npm run preview
```

## Adding Projects

Edit `composables/useProjects.ts` — add entries to the `projects` array:

```ts
{
  id: '10',
  slug: 'my-new-project',         // URL: /project/my-new-project
  title: 'My New Project',
  location: 'Bangkok',
  category: 'Architecture',       // Must match categories array
  year: 2026,
  likes: 0,
  views: '0',
  cover: '/images/my-cover.jpg',  // Local or Unsplash URL
  images: [
    { src: '/images/img1.jpg', alt: 'Description' },
    { src: '/images/img2.jpg', alt: 'Description' },
  ],
}
```

Place local images in `public/images/`.

## Deployment

The `dist/` folder after `npm run generate` can be deployed to:
- **Netlify** — drag & drop `dist/`
- **Vercel** — connect repo, set output to `dist`
- **GitHub Pages** — push `dist/` to `gh-pages` branch
- **Any static host** — just upload `dist/`

## Customisation

| File | What to change |
|------|---------------|
| `composables/useProjects.ts` | Project data, categories |
| `layouts/default.vue` | Nav links, footer info (email, phone, socials) |
| `tailwind.config.ts` | Colors, fonts |
| `pages/index.vue` | Hero video URL, works section copy |
