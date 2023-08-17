import { readFileSync } from "fs-extra";
import type { Plugin } from "rollup";
import type { LibraryFormats, BuildOptions } from "vite";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import {
  COMPONENTS_ENTRY,
  VUE_DEMI_IIFE,
  getComponentLibOutputDir,
  VUE_LIB_MAP,
} from "./path";
import {
  EXTERNAL_LIBS,
  IIFE_GLOBALS_CONFIG,
  UI_LIB_IIFE_NAME,
  VersionType,
} from "../meta/constants";
import { UserConfig } from "vite";
import { getCommonAlias } from "./alias";

/** rollup 公共插件配置 */
export function getPublicRollupPlugins(): Plugin[] {
  return [
    nodeResolve({
      resolveOnly: ["lodash-es"],
    }),
  ];
}
/** 动态插入vue-demi运行时 */
export function dynamicInjectVueDemiPlugin(): Plugin {
  const vueDemiRuntimeCode = readFileSync(VUE_DEMI_IIFE, "utf-8");
  const injectFormatList: LibraryFormats[] = ["iife", "umd"];
  return {
    name: "inject-vue-demi-runtime",
    renderChunk(code, chunks) {
      if (injectFormatList.some((format) => chunks.fileName.includes(format))) {
        return `${vueDemiRuntimeCode};\n;${code}`;
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
        if (format === "es") {
          return "index.mjs";
        } else {
          return `index.${format}.js`;
        }
      },
    },
    rollupOptions: {
      external: EXTERNAL_LIBS,
      output: {
        globals: {
          ...IIFE_GLOBALS_CONFIG,
        },
        plugins: [
          dynamicInjectVueDemiPlugin(),
          ...getPublicRollupPlugins()
        ],
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
  };
}
