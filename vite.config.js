import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8081,
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
      }
    ]
  }
});
