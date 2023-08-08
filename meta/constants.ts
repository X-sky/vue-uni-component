const VALID_COMP_VERSIONS = ["2", "2.7", "3"] as const;
const COMP_VERSION_PREFIX = "v";
export type Version = (typeof VALID_COMP_VERSIONS)[number];
export type VersionType = `${typeof COMP_VERSION_PREFIX}${Version}`;
export type MonoRepoType = "utils";
export type LibSuffix = VersionType | MonoRepoType;
export function isValidVersionType(str: string): str is VersionType {
  const version = str.replace(COMP_VERSION_PREFIX, "");
  return (
    str.startsWith(COMP_VERSION_PREFIX) &&
    VALID_COMP_VERSIONS.includes(version as any)
  );
}

export type ComponentLibNameType = `@vue-uni-component/${VersionType}`;

export const UI_LIB_IIFE_NAME = "__VUE_UNI_COMP__";
export const UTILS_IIFE_NAME = "__VUE_UNI_UTILS__";
export const IIFE_GLOBALS_CONFIG = {
  vue: "Vue",
  "vue-demi": "VueDemi",
  "@vue/composition-api/dist/vue-composition-api.mjs": "VueCompositionAPI",
  "@vue-uni-component/utils": UTILS_IIFE_NAME,
} as const;
export const EXTERNAL_LIBS = Object.getOwnPropertyNames(IIFE_GLOBALS_CONFIG);

export const getComponentLibName = (libName: LibSuffix) =>
  `@vue-uni-component/${libName}`;
