import { execSync } from "node:child_process";
import path, { relative, resolve } from "node:path";
import fs from "fs-extra";
import {
  VersionType,
  getComponentLibName,
  type LibSuffix,
} from "~/meta/constants";
import { ROOT_DIR, buildLog, getComponentLibOutputDir } from "~/utils";
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

function getPosixPathRelativeToRoot(p: string) {
  return relative(ROOT_DIR, p).replaceAll(path.sep, "/");
}
/**
 * build @vue-uni-ui/v3 types
 */
function buildCmpTypesV3() {
  if (process.cwd() !== ROOT_DIR) {
    // need to be run under root directory
    return;
  }
  // generate cmp types for vue3
  if (fs.existsSync(utilsTypesOutDir)) {
    const tmpJsonPath = resolve(ROOT_DIR, "tsconfig.export.json");
    const tmpJsonFile = fs.readJsonSync(tmpJsonPath);
    tmpJsonFile.compilerOptions.paths = {
      // get relative utils output pat6h
      "@vue-uni-ui/utils": [
        `./${getPosixPathRelativeToRoot(getComponentLibOutputDir("utils"))}`,
      ],
      "~/*": ["./*"],
    };
    tmpJsonFile.compilerOptions.declarationDir = `./${getPosixPathRelativeToRoot(
      cmpTypesOutDirV3
    )}`;
    tmpJsonFile.vueCompilerOptions = {
      target: 3,
    };

    const tsConfigJsonName = "tsconfig.v3.json";
    const tsConfigJsonPath = resolve(ROOT_DIR, tsConfigJsonName);

    fs.writeJSONSync(tsConfigJsonPath, tmpJsonFile);
    // build cmp types only after utils types built
    execSync(`pnpm exec vue-tsc --project ${tsConfigJsonName}`);
    fs.remove(tsConfigJsonPath);
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
