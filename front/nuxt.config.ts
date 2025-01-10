// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/style/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL ?? `http://localhost:3000`,
    },
  },
  app: {
    head: {
      title: "WaweruSacco",
    },
  },
  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
});
