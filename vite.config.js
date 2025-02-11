import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (Path) => Path.replace(/^\/api/, ""),
      },
    },
  },
  // Remove the base path since we're not using GitHub Pages anymore
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: true, // Add source maps for debugging
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
