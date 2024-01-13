import Components from "unplugin-vue-components/vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts";
import VueRouter from "unplugin-vue-router/vite";

import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));
  return defineConfig({
    plugins: [
      VueRouter(),
      Layouts(),
      Vue({
        template: { transformAssetUrls },
      }),
      Vuetify({
        autoImport: true,
        styles: {
          configFile: "src/styles/settings.scss",
        },
      }),
      Components(),
      ViteFonts({
        google: {
          families: [
            {
              name: "Roboto",
              styles: "wght@100;300;400;500;700;900",
            },
          ],
        },
      }),
    ],
    define: { "process.env": {} },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    server: {
      port: parseInt(process.env.VITE_APP_PORT),
    },
  });
};
