import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    root: 'public',
    publicDir: false,
    base: process.env.GITHUB_PAGES ? '/MedConnect/' : '/',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'public/index.html')
        }
      }
    },
    server: {
      port: 3000,
      open: true,
      cors: true
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    define: {
      // Make env variables available
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY)
    }
  };
});