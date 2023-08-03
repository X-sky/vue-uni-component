import { readFileSync } from "fs-extra";
import type { Plugin } from "rollup";
import type { LibraryFormats, BuildOptions } from "vite";

import { COMPONENTS_ENTRY, OUTPUT_DIR, VUE_DEMI_IIFE } from "./path";
import { resolve } from "node:path";
import { IIFE_NAME } from "../meta/constants";

export type Version = "2" | "2.7" | "3";
export type VersionType = `v${Version}`;

/** 动态插入vue-demi运行时 */
function dynamicInjectVueDemiPlugin(): Plugin {
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
  const outDir = resolve(OUTPUT_DIR, version);
  return {
    outDir,
    emptyOutDir: true,
    lib: {
      entry: COMPONENTS_ENTRY,
      formats: ["es", "cjs", "iife"],
      name: IIFE_NAME,
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "vue-demi",
        "vue",
        "@vue/composition-api/dist/vue-composition-api.mjs",
      ],
      output: {
        globals: {
          vue: "Vue",
          "vue-demi": "VueDemi",
          "@vue/composition-api/dist/vue-composition-api.mjs":
            "VueCompositionAPI",
        },
        plugins: [dynamicInjectVueDemiPlugin()],
      },
    },
  };
}
