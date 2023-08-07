import { resolve } from "node:path";
import { defineConfig } from "vite";
import { createVuePlugin as vue2 } from "vite-plugin-vue2";
import setupScriptPlugin from "unplugin-vue2-script-setup/vite";
import {
  ROOT_DIR,
  VUE_DEMI_ENTRY_2,
  VUE_ENTRY_2,
  getBasicBuildOptions,
} from "../../utils";

const destDirName = 'v2';
export default defineConfig({
  plugins: [vue2(), setupScriptPlugin({})],
  server: {
    port: 2000,
  },
  resolve: {
    alias: {
      "~": ROOT_DIR,
      vue: VUE_ENTRY_2,
      "vue-demi": VUE_DEMI_ENTRY_2,
      "@vue/composition-api": resolve(
        __dirname,
        "node_modules/@vue/composition-api"
      ),
    },
  },
  build: {
    ...getBasicBuildOptions(destDirName),
  },
});
