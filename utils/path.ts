import { resolve } from "node:path";
import fg from "fast-glob";

export const ROOT_DIR = resolve(__dirname, "..");

// <----------------- source code path ----------------->
export const PACKAGES_ROOT = resolve(ROOT_DIR, "packages");
export const COMPONENTS_ENTRY = resolve(PACKAGES_ROOT, "components", "index.ts");

export const META_ROOT = resolve(ROOT_DIR, 'meta');
export const OUTPUT_META = resolve(META_ROOT, 'lib');

// <----------------- output path ----------------->
export const PUBLISH_ROOT = resolve(ROOT_DIR, "dist");
export const OUTPUT_DIR = resolve(PUBLISH_ROOT, "lib");

// <----------------- other ----------------->
export const VUE_DEMI_LIB = resolve(ROOT_DIR, "node_modules/vue-demi/lib");

export const VUE_DEMI_IIFE = resolve(VUE_DEMI_LIB, "index.iife.js");

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

/** 获取容器路径 */
export async function getContainerEntries() {
  const matchPattern = "./containers/";
  const pathList = await fg(`${matchPattern}*`, {
    onlyDirectories: true,
  });
  return pathList.map((pathStr) => pathStr.replace(matchPattern, ""));
}
