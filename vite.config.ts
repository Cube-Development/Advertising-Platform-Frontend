import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> = {
  theme_color: "#8936FF",
  background_color: "#2EC6FE",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "./pwa/icons/icon512_maskable.png",
      type: "image/png"
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "./pwa/icons/icon512_rounded.png",
      type: "image/png"
    }
  ],
  screenshots: [
    {
      src: "./pwa/screens/wide-advertiser.png",
      type: "image/png",
      sizes: "1000x850",
      form_factor: "wide"
    },
    {
      src: "./pwa/screens/wide-blogger.png",
      type: "image/png",
      sizes: "1000x850",
      form_factor: "wide"
    },
    {
      src: "./pwa/screens/wide-catalog.png",
      type: "image/png",
      sizes: "1000x850",
      form_factor: "wide"
    },
    {
      src: "./pwa/screens/narrow-advertiser.png",
      type: "image/png",
      sizes: "450x750",
      form_factor: "narrow"
    },
    {
      src: "./pwa/screens/narrow-blogger.png",
      type: "image/png",
      sizes: "450x750",
      form_factor: "narrow"
    },
    {
      src: "./pwa/screens/narrow-catalog.png",
      type: "image/png",
      sizes: "450x750",
      form_factor: "narrow"
    },
  ],
  orientation: "any",
  display: "standalone",
  lang: "ru-RU",
  name: "Blogix",
  short_name: "Blogix",
  start_url: "/",
  description: "Blogix — современная платформа, объединяющая рекламодателей и создателей контента. Прозрачные сделки, удобный поиск и автоматизация размещения рекламы в блогах и медиа-каналах."
};

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['pdfjs-dist/build/pdf.worker.min.mjs']
  },
  plugins: [
    react(),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   workbox: {
    //     globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg, ico}"],
    //     maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, 
    //   },
    //   manifest: manifest,
    //   devOptions: {
    //     enabled: true, // Включает PWA в режиме разработки
    //   },
    // }),
    sentryVitePlugin({
      org: "blogix",
      project: "blogix-frontend",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@entities": path.resolve(__dirname, "src/entities"),
      "@widgets": path.resolve(__dirname, "src/widgets"),
      "@features": path.resolve(__dirname, "src/features"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
  server: {
    allowedHosts: ["blogix.ngrok.dev"],
    host: true
  }
});
