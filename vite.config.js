import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Annie/',  // Change 'Annie' to your GitHub repo name
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
