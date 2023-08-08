import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import createCommonjsPlugin from "@rollup/plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createCommonjsPlugin(), // 添加@rollup/plugin-commonjs插件
    nodeResolve() // 添加rollup-plugin-node-resolve插件
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src") // 路径别名
    },
    extensions: [".js", ".json", ".ts", "tsx"] // 使用路径别名时想要省略的后缀名，可以自己 增减
  }
});