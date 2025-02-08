import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/frontend-quiz-app",
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
