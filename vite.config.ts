import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages project site. Change to your repository name if different.
  base: '/deutsch-learning-os/',
});
