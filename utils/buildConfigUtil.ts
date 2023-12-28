import { readFileSync } from "node:fs";
import type { LibraryFormats, BuildOptions, UserConfig } from "vite";
import { configDefaults } from "vitest/config";
import type { Plugin as RollupPlugin } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import {
  COMPONENTS_ENTRY,
  VUE_DEMI_IIFE,
  getComponentLibOutputDir,
  VUE_LIB_MAP,
  getContainerDir,
} from "./path";
import {
  MODULES_EXTERNAL_LIBS,
  MODULES_GLOBALS_CONFIG,
  UI_LIB_IIFE_NAME,
  VersionType,
} from "../meta/constants";
import { getCommonAlias } from "./alias";
import { merge } from "lodash-es";

/** rollup 公共插件配置 */
export function getPublicRollupPlugins(): RollupPlugin[] {
  return [
    nodeResolve({
      resolveOnly: ["lodash-es"],
    }),
  ];
}
/** 动态插入vue-demi运行时 */
export function dynamicInjectVueDemiPlugin(): RollupPlugin {
  const vueDemiRuntimeCode = readFileSync(VUE_DEMI_IIFE, "utf-8");
  const injectFormatList: LibraryFormats[] = ["iife", "umd"];
  return {
    name: "inject-vue-demi-runtime",
    renderChunk(code, chunks) {
      if (injectFormatList.some((format) => chunks.fileName.includes(format))) {
        return `${vueDemiRuntimeCode}\n${code}`;
      } else {
        return code;
      }
    },
  };
}

export function getBasicBuildOptions(version: VersionType): BuildOptions {
  const outDir = getComponentLibOutputDir(version);
  return {
    outDir,
    emptyOutDir: true,
    lib: {
      entry: COMPONENTS_ENTRY,
      formats: ["es", "cjs", "iife"],
      name: UI_LIB_IIFE_NAME,
      fileName: (format) => {
        switch (format) {
          case "cjs":
            return "index.cjs";
          case "es":
            return "index.mjs";
          default:
            return `index.${format}.js`;
        }
      },
    },
    rollupOptions: {
      external: MODULES_EXTERNAL_LIBS,
      output: {
        globals: {
          ...MODULES_GLOBALS_CONFIG,
        },
        plugins: [dynamicInjectVueDemiPlugin(), ...getPublicRollupPlugins()],
      },
    },
  };
}

export function getBasicContainerViteConfig(version: VersionType): UserConfig {
  return {
    server: {
      port: 2143,
    },
    resolve: {
      alias: {
        ...getCommonAlias(),
        ...VUE_LIB_MAP[version],
      },
    },
    build: {
      ...getBasicBuildOptions(version),
    },
    test: {
      root: getContainerDir(version),
      include: [
        ...configDefaults.include,
        ...configDefaults.include.map(
          (p) => `../../packages/{components,utils}/${p}`
        ),
      ],
      exclude: [
        ...configDefaults.exclude,
        ...configDefaults.exclude.map(
          (p) => `../../packages/{components,utils}/**/${p}`
        ),
      ],
    },
  };
}

interface CustomViteConfig extends Partial<UserConfig> {
  /** vue版本 */
  vueVersion: VersionType;
}
export function mergeViteConfig(customConfig: CustomViteConfig): UserConfig {
  const defaultConfig: UserConfig = {
    server: {
      port: 2143,
    },
    resolve: {
      alias: {
        ...getCommonAlias(),
        ...VUE_LIB_MAP[customConfig.vueVersion],
      },
    },
    build: {
      ...getBasicBuildOptions(customConfig.vueVersion),
    },
  };
  return merge({}, defaultConfig, customConfig);
}
