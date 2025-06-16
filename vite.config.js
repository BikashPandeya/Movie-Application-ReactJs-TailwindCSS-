import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react(), tailwindcss(),],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'myLib',
            fileName: 'myLib',
        },
        rollupOptions: {
            external: [/^node:\w+/], // <-- ignores all 'node:*'
        },
    },
});