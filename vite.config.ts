import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    proxy: {
      // Mirrors handleSanityProxy in src/worker.ts, which only runs under `wrangler dev` /
      // the real deployment. Plain `vite dev` has no Worker at all, so without this,
      // /api/sanity falls through to Vite's SPA-fallback index.html instead of real JSON.
      '/api/sanity': {
        target: 'https://cmdikf3a.apicdn.sanity.io',
        changeOrigin: true,
        rewrite: (path) => {
          const url = new URL(path, 'http://localhost')
          url.searchParams.set('perspective', 'published')
          return `/v2024-01-01/data/query/production${url.search}`
        },
      },
    },
  },
})
