import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), tanstackRouter(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("firebase")) {
            return "firebase-vendor";
          }

          if (id.includes("@hello-pangea/dnd")) {
            return "dnd-vendor";
          }

          if (
            id.includes("@google/generative-ai")
          ) {
            return "ai-vendor";
          }

          return "vendor";
        },
      },
    },
  },
});
