import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Learnfusion_web",
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      external: ['sweetalert2'],
    },
  },
});
