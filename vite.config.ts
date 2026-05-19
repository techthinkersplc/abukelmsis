import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite"; // 1. Import Nitro

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart(), 
    nitro({
      preset: "vercel", // 2. Tell Nitro to bundle specifically for Vercel
    }),
  ],
  resolve: {
    alias: {
      crypto: "node:crypto",
      stream: "node:stream",
      buffer: "node:buffer",
      util: "node:util",
    },
  },
});