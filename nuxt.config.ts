import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    FIRSTPROMOTER_API_KEY: process.env.FIRSTPROMOTER_API_KEY,
  },
  privateRuntimeConfig: {},
});
