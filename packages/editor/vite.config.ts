import {defineConfig} from 'vite';
import {resolve} from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
    ],
    css: {
        preprocessorOptions: {
            less: {
                math: 'always',
                javascriptEnabled: true,
            },
        },
    },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, 'src'),
            },
        ],
        // 使用路径别名时想要省略的后缀名，可以自己 增减
        extensions: ['.js', '.json', '.ts', '.tsx'] 
    }
});