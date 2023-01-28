import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path'
// https://vitejs.dev/config/
/* export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}) */

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  return defineConfig({
    plugins: [
      svelte()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  })
}