import { resolve } from "node:path";
import { VersionType, getComponentLibName } from "../meta/constants";

export const ROOT_DIR = resolve(__dirname, "..");

// <----------------- source code path ----------------->
export const PACKAGES_ROOT = resolve(ROOT_DIR, "packages");
export const COMPONENTS_ENTRY = resolve(
  PACKAGES_ROOT,
  "components",
  "index.ts"
);

export const META_ROOT = resolve(ROOT_DIR, "meta");
export const OUTPUT_META = resolve(META_ROOT, "lib");

// <----------------- output path ----------------->
export const OUTPUT_ROOT = resolve(ROOT_DIR, "dist");
/** component lib output dir */
export const getComponentLibOutputDir = (version: VersionType) =>
  resolve(OUTPUT_ROOT, getComponentLibName(version));

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

export const CDN_CONTAINER_PATH = resolve(ROOT_DIR, "cdn-playground");
export const CDN_CONTAINER_DIST_PATH = resolve(
  CDN_CONTAINER_PATH,
  "lib",
  "dist"
);
export const getCdnFileDistPath = (fileName: string) =>
  resolve(CDN_CONTAINER_DIST_PATH, fileName);
