import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    FIRSTPROMOTER_API_KEY: process.env.FIRSTPROMOTER_API_KEY,
    RECURLY_PUBLIC_KEY: process.env.RECURLY_PUBLIC_KEY,
  },
  privateRuntimeConfig: {},
  css: ["~/assets/css/tailwind.css"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  meta: {
    script: [
      {
        src: "https://js.recurly.com/v4/recurly.js",
      },
    ],
    link: [
      { rel: "stylesheet", href: "https://js.recurly.com/v4/recurly.css" },
    ],
  },
});
