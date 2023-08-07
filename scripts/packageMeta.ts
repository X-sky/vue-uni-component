import { resolve, basename } from "node:path";
import { copyFile, writeFile } from "fs-extra";
import fg from "fast-glob";
import { VersionType, getComponentLibName } from "../meta/constants";
import basePackageInfo from "~/meta/ui-common/base-package.json";
import { getComponentLibOutputDir, ROOT_DIR } from "../utils";

function setPackageJson(version: VersionType) {
  const packageName = getComponentLibName(version);
  basePackageInfo.name = packageName;
  basePackageInfo.description = `Uni Component for Vue ${version.replace(
    "v",
    ""
  )}`;
  const targetPackageJsonPath = resolve(
    getComponentLibOutputDir(version),
    "package.json"
  );
  writeFile(targetPackageJsonPath, JSON.stringify(basePackageInfo), "utf8");
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
