import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 3004,
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  
  preview: {
    allowedHosts: ['sales.admin.codive.co', 'partner.codive.co'],
  },
});
