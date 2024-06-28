import fs from "fs-extra";
import { resolve } from "node:path";
import { ROOT_DIR } from "./path";

const rootPackageJson = fs.readJsonSync(resolve(ROOT_DIR, "package.json"));

export function fixDepsVer(deps: Record<string, string>) {
  const fixedDeps = {
    ...deps,
  };
  Object.getOwnPropertyNames(fixedDeps).forEach((k) => {
    const depsVer = fixedDeps[k];
    if (depsVer.includes("workspace")) {
      fixedDeps[k] = `~${rootPackageJson.version}`;
    }
    if (k.startsWith("vue") || k.startsWith("@vue")) {
      fixedDeps[k] = fixedDeps[k].replace("^", "~");
    }
  });
  return fixedDeps;
}
