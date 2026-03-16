import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, Plugin } from "vite";
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

// Плагин для правильной обработки MIME типов для .mjs файлов
const mimeTypePlugin = (): Plugin => {
  return {
    name: 'mime-type-fix',
    configureServer(server) {
      // Добавляем middleware в начало цепочки
      server.middlewares.use((req, res, next) => {
        if (req.url?.endsWith('.mjs') || req.url?.includes('.mjs?')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        next();
      });
    },
    configurePreviewServer(server) {
      // Также для preview сервера
      server.middlewares.use((req, res, next) => {
        if (req.url?.endsWith('.mjs') || req.url?.includes('.mjs?')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        next();
      });
    },
  };
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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. Базовые библиотеки React (ОБЯЗАТЕЛЬНО вместе для избежания конфликтов Context и хуков)
            if (
              id.includes('/react/') || 
              id.includes('/react-dom/') || 
              id.includes('/react-router') || 
              id.includes('/react-redux/') || 
              id.includes('/@reduxjs/')
            ) {
              return 'vendor-react';
            }

            // 2. UI и анимации (Radix, Framer Motion, Icons) - безопасно выносим в общий чанк дизайна
            if (
              id.includes('/@radix-ui/') || 
              id.includes('/framer-motion/') || 
              id.includes('/lucide-react/') ||
              id.includes('/tailwind')
            ) {
              return 'vendor-ui';
            }

            // 3. Сторонние тяжелые и независимые утилиты (каждая в свой чанк)
            if (id.includes('/@sentry/')) return 'vendor-sentry';
            if (id.includes('/@tiptap/') || id.includes('/prosemirror/')) return 'vendor-editor';
            if (id.includes('/pdfjs-dist/') || id.includes('/react-pdf/')) return 'vendor-pdf';
            if (id.includes('/recharts/') || id.includes('/d3-')) return 'vendor-charts';
            if (id.includes('/swiper/') || id.includes('/embla-carousel/')) return 'vendor-slider';
            
            // Все остальные мелкие зависимости Rollup рассортирует сам
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['pdfjs-dist/build/pdf.worker.min.mjs']
  },
  plugins: [
    react(),
    mimeTypePlugin(),
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
    host: true,
  },
});