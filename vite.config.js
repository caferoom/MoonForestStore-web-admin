import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.json', '.vue'],
  },
  server: {
    open: true,
    host: "localhost",
    port: "6001",
    hmr: { overlay: false },
  }
})
