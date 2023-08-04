import { copySync, removeSync } from "fs-extra";
import { execSync } from "node:child_process";
import {
  OUTPUT_META,
  PUBLISH_ROOT,
  getContainerEntries,
  buildLog,
} from "../utils";

async function main() {
  try {
    buildLog.start("prepare build steps...");
    // 构建前预编译
    buildLog.start("\nbuild packages...");
    // remove cache
    removeSync(PUBLISH_ROOT);
    const containers = await getContainerEntries();
    containers.forEach((containerDir) => {
      execSync(`pnpm -F ./containers/${containerDir} build`, {
        stdio: "inherit",
      });
    });
    buildLog.start("\ncopy meta info...");
    copySync(OUTPUT_META, PUBLISH_ROOT);
    // 构建后补充产物
    buildLog.start("appending build products...");
  } catch (err) {
    buildLog.error(err);
  }
}

if (require.main === module) {
  main();
}
