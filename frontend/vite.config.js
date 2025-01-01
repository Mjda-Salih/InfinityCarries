import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Proxy API requests to the backend
      "/api": {
        target: "http://localhost:5000", // Replace with your backend's URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
