import { resolve, basename } from "node:path";
import { copyFile, readJsonSync, writeJSON } from "fs-extra";
import fg from "fast-glob";
import { VersionType, getComponentLibName } from "../meta/constants";
import {
  getComponentLibOutputDir,
  ROOT_DIR,
  UI_COMMON_META,
  fixDepsVer,
} from "../utils";

import componentPackageJson from "../packages/components/package.json";
import rootPackageJson from "../package.json";

function setPackageJson(version: VersionType) {
  const packageName = getComponentLibName(version);
  const basePackageInfo = readJsonSync(resolve(UI_COMMON_META, "base-package.json"));
  // override ui package.json props
  basePackageInfo.name = packageName;
  basePackageInfo.version = rootPackageJson.version;
  basePackageInfo.description = `Uni Component for Vue ${version.replace(
    "v",
    ""
  )}`;
  // override dependencies
  basePackageInfo.dependencies = fixDepsVer(
    Object.assign(
      {},
      componentPackageJson.dependencies,
      rootPackageJson.dependencies
    )
  );
  // override devDependencies if has any
  if (Object.getOwnPropertyNames(componentPackageJson.devDependencies).length) {
    basePackageInfo.devDependencies = Object.assign(
      {},
      componentPackageJson.devDependencies
    );
  }

  const targetPackageJsonPath = resolve(
    getComponentLibOutputDir(version),
    "package.json"
  );
  writeJSON(targetPackageJsonPath, basePackageInfo, {
    spaces: 2,
  });
}

async function copyFiles(version: VersionType) {
  const sourceFiles = await fg("./meta/ui-common/copy/**/*", {
    cwd: ROOT_DIR,
    onlyFiles: true,
    absolute: true,
  });
  const targetLibDir = getComponentLibOutputDir(version);
  sourceFiles.forEach((sourceFile) => {
    const fileName = basename(sourceFile);
    const targetFilePath = resolve(targetLibDir, fileName);
    copyFile(sourceFile, targetFilePath);
  });
}

export function setPackageMeta(version: VersionType) {
  setPackageJson(version);
  copyFiles(version);
}
