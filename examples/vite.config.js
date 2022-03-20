import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/three-react-context/",
  server: {
    open: true,
  },
  plugins: [react()],
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    brotliSize: 1024,
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks: { three: ["three"] },
      },
    },
  },
});
