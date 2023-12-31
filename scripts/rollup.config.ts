import {
  copyFile,
  existsSync,
  mkdirSync,
  readJsonSync,
  writeJSON,
} from "fs-extra";
import { dirname, resolve, extname } from "node:path";
import type { RollupOptions, Plugin } from "rollup";
import type { Options as ESBuildOptions } from "rollup-plugin-esbuild";
import esbuild from "rollup-plugin-esbuild";
import {
  UTILS_IIFE_NAME,
  IIFE_GLOBALS_CONFIG,
  IIFE_EXTERNAL_LIBS,
} from "~/meta/constants";
import {
  buildLog,
  dynamicInjectVueDemiPlugin,
  getComponentLibOutputDir,
  getPublicRollupPlugins,
  ROOT_DIR,
  UTILS_ENTRY,
} from "~/utils";

const outDir = getComponentLibOutputDir("utils");

function esbuildMinifier(options: ESBuildOptions) {
  const { renderChunk } = esbuild(options);
  return {
    name: "esbuild-minifier",
    renderChunk,
  };
}

function copyMetaPlugin(): Plugin {
  return {
    name: "copy-meta-plugin",
    buildEnd() {
      buildLog.info("Copy utils meta...");
      const metaFileNames = ["package.json", "README.md"];
      if (!existsSync(outDir)) {
        mkdirSync(outDir);
      }
      metaFileNames.forEach((fileName) => {
        const sourceFilePath = resolve(dirname(UTILS_ENTRY), fileName);
        const targetFilePath = resolve(outDir, fileName);
        if (extname(fileName).includes("json")) {
          // update dependencies with root
          const jsonContent = readJsonSync(sourceFilePath);
          const rootJson = readJsonSync(resolve(ROOT_DIR, "package.json"));
          jsonContent.dependencies = {
            ...(jsonContent.dependencies || {}),
            ...(rootJson.dependencies || {}),
          };
          writeJSON(targetFilePath, jsonContent, {
            spaces: 2,
          });
        } else {
          copyFile(sourceFilePath, targetFilePath);
        }
      });
    },
  };
}

const configs: RollupOptions[] = [];

configs.push({
  input: UTILS_ENTRY,
  output: [
    {
      file: resolve(outDir, "index.mjs"),
      format: "es",
    },
    {
      file: resolve(outDir, "index.cjs"),
      format: "cjs",
    },
    {
      file: resolve(outDir, "index.iife.js"),
      format: "iife",
      name: UTILS_IIFE_NAME,
      extend: true,
      globals: IIFE_GLOBALS_CONFIG,
    },
    {
      file: resolve(outDir, "index.iife.min.js"),
      format: "iife",
      name: UTILS_IIFE_NAME,
      extend: true,
      globals: IIFE_GLOBALS_CONFIG,
      plugins: [
        esbuildMinifier({
          minify: true,
        }),
      ],
    },
  ],
  plugins: [dynamicInjectVueDemiPlugin(), esbuild(), copyMetaPlugin(), ...getPublicRollupPlugins()],
  external: [...IIFE_EXTERNAL_LIBS],
});

export default configs;
