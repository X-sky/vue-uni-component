import { defineConfig } from "vite";
import { createVuePlugin as vue2 } from "vite-plugin-vue2";
import setupScriptPlugin from "unplugin-vue2-script-setup/vite";
import { ROOT_DIR, VUE_DEMI_ENTRY_2, VUE_ENTRY_2 } from "../../utils/path";
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
    },
  },
});
