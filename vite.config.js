import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 8081,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@scss/global.scss";`
      }
    }
  },
  resolve: {
    alias: [
      {
        find: "@s",
        replacement: fileURLToPath(new URL("./src/store", import.meta.url))
      },
      {
        find: "@c",
        replacement: fileURLToPath(new URL("./src/components", import.meta.url))
      },
      {
        find: "@a",
        replacement: fileURLToPath(new URL("./src/assets", import.meta.url))
      },
      {
        find: "@r",
        replacement: fileURLToPath(new URL("./src/router", import.meta.url))
      },
      {
        find: "@p",
        replacement: fileURLToPath(new URL("./src/pages", import.meta.url))
      },
      {
        find:"@scss",
        replacement: fileURLToPath(new URL("./src/styles", import.meta.url))
      }
    ]
  }
});
