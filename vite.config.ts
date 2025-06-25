import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, 'src/Assets'),
      '@features': path.resolve(__dirname, 'src/Features'),
      '@services': path.resolve(__dirname, 'src/Services'),
      '@utils': path.resolve(__dirname, 'src/Utils'),
    },
  },
  css: {
    preprocessorOptions: {
      // ensure Tailwind directives aren't purged
    },
  },
  server: {
    port: 4000,
    strictPort: true,
    host: true,
    origin: 'http://localhost:4000',
  },
  preview: {
    port: 4000,
    strictPort: true,
  },
});
