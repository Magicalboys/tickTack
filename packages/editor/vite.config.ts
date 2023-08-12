import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src") // 路径别名
    },
    extensions: [".js", ".json", ".ts", ".tsx"] // 使用路径别名时想要省略的后缀名，可以自己 增减
  }
});