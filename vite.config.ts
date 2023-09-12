import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VarletUIResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Pages from 'vite-plugin-pages';
import { resolve } from 'path';
import PurgeIcons from 'vite-plugin-purge-icons';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
    ],
  },
  plugins: [
    vue(),
    UnoCSS(),
    Components({
      dirs: ['src/components'],
      resolvers: [VarletUIResolver()],
      dts: './src/components.d.ts',
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: './src/auto-imports.d.ts',
    }),
    // 基于文件系统的路由
    Pages({
      dirs: [{ dir: resolve(__dirname, './src/pages'), baseRoute: '' }],
      exclude: ['**/components/*.vue'],
      extensions: ['vue'],
    }),
    PurgeIcons({
      /* PurgeIcons Options */
    }),
  ],
  server: {
    host: '0.0.0.0',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "/@/styles/variables.scss"; @import "/@/styles/mixins.scss";',
      },
    },
  },
});
