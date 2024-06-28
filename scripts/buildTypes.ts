import { execSync } from "node:child_process";
import { resolve } from "node:path";
import fs from "fs-extra";
import {
  VersionType,
  getComponentLibName,
  type LibSuffix,
} from "~/meta/constants";
import { buildLog, getComponentLibOutputDir } from "~/utils";
import { genGlobalTypes } from "~/meta/ui-common/globalTypesTpl";

const getTypesOutDir = (libName: LibSuffix) =>
  resolve(getComponentLibOutputDir(libName), "types");

const utilsTypesOutDir = getTypesOutDir("utils");
const cmpTypesOutDirV3 = getTypesOutDir("v3");

/**
 * built @vue-uni-ui/utils types
 */
function buildUtilsTypes() {
  execSync(
    `pnpm exec tsc --project tsconfig.utils.json --declarationDir ${utilsTypesOutDir}`
  );
}

/**
 * build @vue-uni-ui/v3 types
 */
function buildCmpTypesV3() {
  // const baseConfigJson = fs.readJsonSync(resolve(ROOT_DIR, "package.json"));
  // generate cmp types for vue3
  if (fs.existsSync(utilsTypesOutDir)) {
    // build cmp types only after utils types built
    execSync(
      `pnpm exec vue-tsc --project tsconfig.v3.json --declarationDir ${cmpTypesOutDirV3}`
    );
  }
}

/**
 * set components.d.ts for volar
 */
export function setPackageTypes(version: VersionType) {
  // TODO: dynamic generate types
  const packageName = getComponentLibName(version);
  const globalTypesContent = genGlobalTypes(
    version,
    `UniTemplate: typeof import('${packageName}')['UniTemplate']`
  );
  const outLibDir = getComponentLibOutputDir(version);
  const targetFilePath = resolve(outLibDir, "components.d.ts");
  fs.writeFile(targetFilePath, globalTypesContent, "utf-8");
}

export async function buildTypes() {
  // generate utils types
  buildLog.start("Generate types...");
  buildUtilsTypes();
  buildCmpTypesV3();
}
