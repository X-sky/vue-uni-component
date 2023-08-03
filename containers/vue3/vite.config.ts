import { defineConfig } from "vite";
import vue3 from "@vitejs/plugin-vue";
import { ROOT_DIR, VUE_ENTRY_3, VUE_DEMI_ENTRY_3, getBasicBuildOptions } from "../../utils";

const destDirName = 'v3';
export default defineConfig({
  plugins: [vue3()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "~": ROOT_DIR,
      vue: VUE_ENTRY_3,
      "vue-demi": VUE_DEMI_ENTRY_3,
    },
  },
  build: {
    ...getBasicBuildOptions(destDirName)
  }
});
