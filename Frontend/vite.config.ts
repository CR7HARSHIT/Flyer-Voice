import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  base: "/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Airport Feedback",
        short_name: "Feedback",
        description: "A simple PWA to collect airport feedback from passengers.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#007bff",
        orientation: "portrait",
        icons: [
          {
            src: "/xxx.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/xxx.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/xxx.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
