import rootPackageJson from "../package.json";

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
