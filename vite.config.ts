import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ohImage } from "@lonik/oh-image/plugin";

export default defineConfig({
  plugins: [react(), ohImage()],
});
