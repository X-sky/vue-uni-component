import { defineConfig } from "vite";
import vue27 from "@vitejs/plugin-vue2";
import {
  ROOT_DIR,
  VUE_ENTRY_27,
  VUE_DEMI_ENTRY_27,
  getBasicBuildOptions,
} from "../../utils";

const destDirName = "v2.7";
export default defineConfig({
  plugins: [vue27()],
  server: {
    port: 2700,
  },
  resolve: {
    alias: {
      "~": ROOT_DIR,
      vue: VUE_ENTRY_27,
      "vue-demi": VUE_DEMI_ENTRY_27,
    },
  },
  build: {
    ...getBasicBuildOptions(destDirName),
  },
});
