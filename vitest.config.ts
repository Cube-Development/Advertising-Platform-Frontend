import { defineConfig, type Plugin } from 'vitest/config';
import { existsSync } from 'fs';
import path from 'path';

/**
 * Импорты ассетов из public по абсолютному пути (`import gif from "/animated/x.gif"`)
 * Vite резолвит сам, vitest — нет: путь от корня ведёт в public, если такой файл есть.
 * Нужен тестам со store — баррели сущностей тянут UI с такими импортами
 */
const publicAssets = (): Plugin => ({
    name: 'public-assets',
    enforce: 'pre',
    resolveId(id) {
        if (!id.startsWith('/')) return null;
        const file = path.resolve(__dirname, 'public', `.${id}`);
        return existsSync(file) ? file : null;
    },
});

export default defineConfig({
    plugins: [publicAssets()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
    },
    resolve: {
        alias: {
            '@shared': path.resolve(__dirname, './src/shared'),
            '@entities': path.resolve(__dirname, './src/entities'),
            '@features': path.resolve(__dirname, './src/features'),
            '@widgets': path.resolve(__dirname, './src/widgets'),
            '@app': path.resolve(__dirname, './src/app'),
            '@pages': path.resolve(__dirname, './src/pages'),
        },
    },
});
