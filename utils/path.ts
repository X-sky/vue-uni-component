import { resolve } from "node:path";
import { LibSuffix, getComponentLibName, VersionType } from "../meta/constants";

export const ROOT_DIR = resolve(__dirname, "..");
export const LOG_FILE_PATH = resolve(ROOT_DIR, "./build.log");
export const TEST_LOG_FILE_PATH = resolve(ROOT_DIR, "./test.log");

// <----------------- source code path ----------------->
export const PACKAGES_ROOT = resolve(ROOT_DIR, "packages");
export const COMPONENTS_ROOT = resolve(PACKAGES_ROOT, "components");
export const COMPONENTS_ENTRY = resolve(COMPONENTS_ROOT, "index.ts");
export const COMPONENTS_TEST_ROOT = resolve(PACKAGES_ROOT, "components-test");
export const COMPONENTS_TEST_ENTRY = resolve(COMPONENTS_TEST_ROOT, "index.ts");
export const UTILS_ENTRY = resolve(PACKAGES_ROOT, "utils/index.ts");

export const META_ROOT = resolve(ROOT_DIR, "meta");
export const UI_COMMON_META = resolve(META_ROOT, "ui-common");
export const UI_TEMPLATE_META = resolve(UI_COMMON_META, "template");

// <----------------- output path ----------------->
export const OUTPUT_ROOT = resolve(ROOT_DIR, "dist");
/** component lib output dir */
export const getComponentLibOutputDir = (libName: LibSuffix) =>
  resolve(OUTPUT_ROOT, getComponentLibName(libName));

// <----------------- other ----------------->

export const VUE_DEMI_LIB = resolve(ROOT_DIR, "node_modules/vue-demi/lib");

export const VUE_DEMI_IIFE = resolve(VUE_DEMI_LIB, "index.iife.js");

const VUE_DEMI_ENTRY_2 = resolve(VUE_DEMI_LIB, "v2/index.mjs");
const VUE_DEMI_ENTRY_27 = resolve(VUE_DEMI_LIB, "v2.7/index.mjs");
const VUE_DEMI_ENTRY_3 = resolve(VUE_DEMI_LIB, "v3/index.mjs");

export const getContainerDir = (v: VersionType) =>
  resolve(ROOT_DIR, `containers/${v}`);

export const getVueEntry = (v: VersionType) =>
  resolve(getContainerDir(v), "node_modules/vue");

export const getVueTestEntry = (v: VersionType) =>
  resolve(getContainerDir(v), "node_modules/@vue/test-utils");

export const VUE_LIB_MAP: Record<
  VersionType,
  Record<"vue" | "vue-demi", string>
> = {
  v2: {
    "vue-demi": VUE_DEMI_ENTRY_2,
    vue: getVueEntry("v2"),
  },
  "v2.7": {
    "vue-demi": VUE_DEMI_ENTRY_27,
    vue: getVueEntry("v2.7"),
  },
  v3: {
    "vue-demi": VUE_DEMI_ENTRY_3,
    vue: getVueEntry("v3"),
  },
};
export const VUE_LIB_TEST_MAP = {
  v2: {
    "@vue/test-utils": getVueTestEntry("v2"),
  },
  "v2.7": {
    "@vue/test-utils": getVueTestEntry("v2"),
  },
  v3: {
    "@vue/test-utils": getVueTestEntry("v3"),
  },
};
export const CDN_CONTAINER_PATH = resolve(ROOT_DIR, "cdn-playground");
export const CDN_CONTAINER_DIST_PATH = resolve(
  CDN_CONTAINER_PATH,
  "lib",
  "dist"
);
export const getCdnFileDistPath = (fileName: string) =>
  resolve(CDN_CONTAINER_DIST_PATH, fileName);
