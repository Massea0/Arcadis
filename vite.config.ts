import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    port: 5173,
    strictPort: true,
  },
  resolve: {
    dedupe: ['three', 'react', 'react-dom']
  },
  optimizeDeps: {
    include: [
      'three',
      'react',
      'react-dom',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap'
    ],
    force: true
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [/three/, /node_modules/],
    }
  },
  assetsInclude: ['**/*.svg'], // Assure le support des fichiers .svg
});
