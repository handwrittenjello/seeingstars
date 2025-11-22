import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: '../public',     
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        gallery: 'src/gallery.html',
        videos: 'src/videos.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});