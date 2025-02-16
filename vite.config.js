import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd());

  // Set hostname dynamically
  let host;
  switch (mode) {
    case 'development':
      host = 'localhost';
      break;
    case 'dev':
      host = 'web.dev.acme.com';
      break;
    case 'qa':
      host = 'web.qa.acme.com';
      break;
    case 'production':
      host = 'web.prd.acme.com';
      break;
    default:
      host = 'localhost'; // Fallback for local development
  }

  return {
    plugins: [react()],
    server: {
      host, // Dynamically set host based on environment
      port: 3000,
      cors: true
    },
    define: {
      'import.meta.env.VITE_MODE': JSON.stringify(mode),
      'import.meta.env.API_URL': JSON.stringify(env.VITE_API_URL),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.js',
      include: ['src/__tests__/**/*.test.{js,jsx}'],
    }
  };
});
