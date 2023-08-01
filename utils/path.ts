import { resolve } from "node:path";

export const ROOT_DIR = resolve(__dirname, "..");


export const VUE_DEMI_LIB = resolve(ROOT_DIR, "node_modules/vue-demi/lib");

export const VUE_DEMI_ENTRY_2 = resolve(VUE_DEMI_LIB, "v2/index.mjs");
export const VUE_DEMI_ENTRY_27 = resolve(VUE_DEMI_LIB, "v2.7/index.mjs");
export const VUE_DEMI_ENTRY_3 = resolve(VUE_DEMI_LIB, "v3/index.mjs");

export const VUE_ENTRY_2 = resolve(
  ROOT_DIR,
  "node_modules/vue/dist/vue.runtime.esm.js"
);
export const VUE_ENTRY_27 = resolve(
  ROOT_DIR,
  "node_modules/vue2/dist/vue.runtime.esm.js"
);
export const VUE_ENTRY_3 = resolve(
  ROOT_DIR,
  "node_modules/vue3/dist/vue.runtime.esm-browser.js"
);
