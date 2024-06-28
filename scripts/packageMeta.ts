import { resolve, basename } from "node:path";
import fs from "fs-extra";
import fg from "fast-glob";
import { VersionType, getComponentLibName } from "../meta/constants";
import {
  getComponentLibOutputDir,
  ROOT_DIR,
  UI_COMMON_META,
  fixDepsVer,
  COMPONENTS_ROOT,
} from "../utils";

const rootPackageJson = fs.readJsonSync(resolve(ROOT_DIR, "package.json"));

const componentPackageJson = fs.readJsonSync(
  resolve(COMPONENTS_ROOT, "package.json")
);
function setPackageJson(version: VersionType) {
  const packageName = getComponentLibName(version);
  const basePackageInfo = fs.readJsonSync(
    resolve(UI_COMMON_META, "base-package.json")
  );
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
  if (
    componentPackageJson.devDependencies &&
    Object.getOwnPropertyNames(componentPackageJson.devDependencies).length
  ) {
    basePackageInfo.devDependencies = Object.assign(
      {},
      componentPackageJson.devDependencies
    );
  }

  const targetPackageJsonPath = resolve(
    getComponentLibOutputDir(version),
    "package.json"
  );
  fs.writeJSON(targetPackageJsonPath, basePackageInfo, {
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
    fs.copyFile(sourceFile, targetFilePath);
  });
}

export function setPackageMeta(version: VersionType) {
  setPackageJson(version);
  copyFiles(version);
}
