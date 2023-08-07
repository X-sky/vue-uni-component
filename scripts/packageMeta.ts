import { resolve } from "node:path";
import { VersionType, getComponentLibName } from "../meta/constants";
import basePackageInfo from "../meta/base-package.json";
import { writeFile } from "fs-extra";
import { getComponentLibOutputDir } from "../utils";

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

export function setPackageMeta(version: VersionType) {
  setPackageJson(version);
}
