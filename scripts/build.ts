import { removeSync } from "fs-extra";
import fg from "fast-glob";
import { execSync, exec } from "node:child_process";
import { buildLog, OUTPUT_ROOT, ROOT_DIR } from "../utils";
import { setPackageMeta } from "./packageMeta";
import { setPackageTypes } from "./types";
import { isValidVersionType } from "~/meta/constants";

/** get dev & build container path */
async function getContainerEntries() {
  const matchPattern = "./containers/";
  const pathList = await fg(`${matchPattern}*`, {
    cwd: ROOT_DIR,
    onlyDirectories: true,
  });
  return pathList.map((pathStr) => pathStr.replace(matchPattern, ""));
}

async function main() {
  try {
    buildLog.start("Prepare build steps...\n");
    // prepare before build
    // # no works for now

    buildLog.start("Build component packages...");
    // remove cache
    removeSync(OUTPUT_ROOT);
    const containers = await getContainerEntries();
    const buildTasks: Promise<void>[] = [];
    containers.forEach((containerDir) => {
      buildTasks.push(new Promise<void>((resolve, reject)=>{
        exec(`pnpm -F ./containers/${containerDir} build`, (err)=>{
          if (err) {
            buildLog.error(err);
            reject(err);
          } else {
            resolve();
          }
        });
      }))
    });
    await Promise.all(buildTasks);
    buildLog.info("Copy component lib meta...");
    // do something
    containers.forEach((dir) => {
      if (isValidVersionType(dir)) {
        setPackageMeta(dir);
        setPackageTypes(dir);
      }
    });
    // build other libs
    buildLog.start("Rollup other packages...");
    execSync(`pnpm run build:rollup`);

    buildLog.success("All build tasks done");
    // buildLog.start("add additional build products...");
    // # no works for now
  } catch (err) {
    buildLog.error(err);
  }
}

if (require.main === module) {
  main();
}
