// import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - Fixed title",
      title: "Disha Programming",
      charset: "utf-8",
      htmlAttrs: {
        lang: "en-US",
      },
      meta: [
        { name: "description", content: "Description of Disha Programming" },
        { name: "keywords", content: "Disa Programming Keywords" },
      ],
      script: [
        // { src:"http://xxx.js" }
      ],
      link: [
        // { rel:"stylesheet",href:"http://xxx.css" }
      ],
    },
  },
  css: [
    "@/assets/main.css",
  ],
  modules: [
    "nuxt-windicss",
  ],
  build: {
    transpile: process.env.NODE_ENV === "production"
      ? [
        "naive-ui",
        "vueuc",
        "@css-render/vue3-ssr",
        "@juggle/resize-observer",
      ]
      : ["@juggle/resize-observer"],
  },
  vite: {
    optimizeDeps: {
      include: process.env.NODE_ENV === "development"
        ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
        : [],
    },
  },
  imports: {
    dirs: ["apis"],
  },
  nitro: {
    // Minify the bundle
    minify: true,
    // Turn off source map generation
    sourceMap: false,
  },
});
