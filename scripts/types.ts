import { writeFile } from "fs-extra";
import { resolve } from "node:path";
import { VersionType, getComponentLibName } from "~/meta/constants";
import { genGlobalTypes } from "~/meta/ui-common/globalTypesTpl";
import { getComponentLibOutputDir } from "~/utils";

function genGlobalTypesByFiles(version: VersionType) {
  // TODO: dynamic generate types
  const packageName = getComponentLibName(version);
  return genGlobalTypes(
    version,
    `UniTemplate: typeof import('${packageName}')['UniTemplate']`
  );
}

export function setPackageTypes(version: VersionType) {
  const globalTypesContent = genGlobalTypesByFiles(version);
  const outLibDir = getComponentLibOutputDir(version);
  const targetFilePath = resolve(outLibDir, "global.d.ts");
  writeFile(targetFilePath, globalTypesContent, "utf-8");
}
