import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { buildLog, getComponentLibOutputDir } from "~/utils";

function buildUtilsTypes() {
  const utilsOutputPath = resolve(getComponentLibOutputDir("utils"), "types");
  execSync(
    `pnpm exec tsc --project tsconfig.export.json --declarationDir ${utilsOutputPath}`
  );
}

export async function buildTypes() {
  // generate utils types
  buildLog.start("Generate types...");
  buildUtilsTypes();
}
