import { defineConfig } from 'vite';

// This config tells Vite to forward any /api requests to our Express backend
// So when frontend calls /api/login, Vite sends it to http://localhost:3000/api/login
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
