import fs from "fs-extra";
import type { LibraryFormats, BuildOptions, UserConfig } from "vite";
import { mergeConfig } from "vite";
import { configDefaults } from "vitest/config";
import type { Plugin as RollupPlugin } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import {
  COMPONENTS_ENTRY,
  VUE_DEMI_IIFE,
  getComponentLibOutputDir,
  ROOT_DIR,
  getContainerDir,
  BABEL_CFG_PATH,
} from "./path";
import {
  MODULES_EXTERNAL_LIBS,
  MODULES_GLOBALS_CONFIG,
  UI_LIB_IIFE_NAME,
  VersionType,
} from "../meta/constants";
import {
  getCommonAlias,
  getVueLibAliases,
  getVueLibTestAliases,
} from "./alias";

/** only transform mjs and cjs */
function dynamicBabelPlugin(): RollupPlugin {
  return {
    name: "dynamic-babel-plugin",
    renderChunk(...args) {
      const { renderChunk: r } = getBabelOutputPlugin({
        configFile: BABEL_CFG_PATH,
      });
      const injectFormatList = ["mjs", "cjs"];
      if (
        typeof r === "function" &&
        injectFormatList.some((format) => args[1].fileName.includes(format))
      ) {
        return r.apply(this, args);
      }

      return args[0];
    },
  };
}
/** rollup 公共插件配置 */
export function getPublicRollupInputPlugins(): RollupPlugin[] {
  return [
    nodeResolve({
      resolveOnly: ["lodash-es"],
    }),
    dynamicBabelPlugin(),
  ];
}
/** 动态插入vue-demi运行时 */
export function dynamicInjectVueDemiPlugin(): RollupPlugin {
  const vueDemiRuntimeCode = fs.readFileSync(VUE_DEMI_IIFE, "utf-8");
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
      plugins: [...getPublicRollupInputPlugins()],
      output: {
        globals: {
          ...MODULES_GLOBALS_CONFIG,
        },
        plugins: [dynamicInjectVueDemiPlugin()],
      },
    },
  };
}

export function getBasicContainerViteConfig(version: VersionType): UserConfig {
  const containerRoot = getContainerDir(version);
  return {
    root: containerRoot,
    server: {
      port: 2143,
    },
    resolve: {
      alias: {
        ...getCommonAlias(),
        ...getVueLibAliases(version),
      },
    },
    plugins: [],
    build: {
      ...getBasicBuildOptions(version),
    },
    test: {
      include: [
        ...configDefaults.include.map(
          (p) => `packages/{components,utils}/${p}`
        ),
      ],
      environment: "jsdom",
      cache: false,
      alias: {
        ...getVueLibTestAliases(version),
      },
      dir: ROOT_DIR,
      server: {
        deps: {
          inline: ["vue", "vue-demi"],
        },
      },
    },
  };
}

interface CustomViteConfig extends Partial<UserConfig> {
  /** vue版本 */
  vueVersion: VersionType;
}
export function mergeViteConfig(customConfig: CustomViteConfig): UserConfig {
  const defaultConfig: UserConfig = getBasicContainerViteConfig(
    customConfig.vueVersion
  );
  return mergeConfig(defaultConfig, customConfig);
}
