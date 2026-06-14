// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  // Static Site Generation
  ssr: true,
  nitro: {
    preset: "static",
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],

  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config.ts",
  },

  app: {
    head: {
      title: "Selection Pix — Real Estate Photography",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Real estate & architectural photography across Thailand.",
        },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap",
        },
      ],
    },
  },
});