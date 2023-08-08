import { resolve } from "node:path";
import type { RollupOptions } from "rollup";
import type { Options as ESBuildOptions } from "rollup-plugin-esbuild";
import esbuild from "rollup-plugin-esbuild";
import {
  UTILS_IIFE_NAME,
  IIFE_GLOBALS_CONFIG,
  EXTERNAL_LIBS,
} from "~/meta/constants";
import {
  dynamicInjectVueDemiPlugin,
  getComponentLibOutputDir,
  UTILS_ENTRY,
} from "~/utils";

function esbuildMinifier(options: ESBuildOptions) {
  const { renderChunk } = esbuild(options);
  return {
    name: "esbuild-minifier",
    renderChunk,
  };
}

const configs: RollupOptions[] = [];

const outDir = getComponentLibOutputDir("utils");
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
  plugins: [dynamicInjectVueDemiPlugin(), esbuild()],
  external: [...EXTERNAL_LIBS],
});

export default configs;
