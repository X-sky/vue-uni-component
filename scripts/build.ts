import { removeSync } from "fs-extra";
import { execSync } from "node:child_process";
import { getContainerEntries, buildLog, OUTPUT_ROOT } from "../utils";
import { setPackageMeta } from "./packageMeta";
import { isValidVersionType } from "~/meta/constants";

async function main() {
  try {
    buildLog.start("prepare build steps...\n");
    // prepare before build
    // # no works for now

    buildLog.start("build packages...");
    // remove cache
    removeSync(OUTPUT_ROOT);
    const containers = await getContainerEntries();
    containers.forEach((containerDir) => {
      execSync(`pnpm -F ./containers/${containerDir} build`, {
        stdio: "inherit",
      });
    });

    buildLog.start("copy meta info...");
    // set meta for npm packages
    // do something
    containers.forEach((dir) => {
      if (isValidVersionType(dir)) {
        setPackageMeta(dir);
      }
    });
    buildLog.start("add additional build products...");
    // # no works for now
  } catch (err) {
    buildLog.error(err);
  }
}

if (require.main === module) {
  main();
}
