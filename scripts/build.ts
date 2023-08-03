import consola from "consola";
import { copySync, removeSync } from "fs-extra";
import { OUTPUT_META, PUBLISH_ROOT, getContainerEntries } from "../utils";
import { execSync } from "node:child_process";

async function main() {
  try {
    consola.info("prepare build steps...");
    // 构建前预编译
    consola.info("\nbuild packages...");
    // remove cache
    removeSync(PUBLISH_ROOT);
    const containers = await getContainerEntries();
    containers.forEach((containerDir) => {
      execSync(`pnpm -F ./containers/${containerDir} build`, {
        stdio: "inherit",
      });
    });
    consola.info("\ncopy meta info...");
    copySync(OUTPUT_META, PUBLISH_ROOT);
    // 构建后补充产物
    consola.info("appending build products...");
  } catch (err) {
    consola.error(err);
  }
}

if (require.main === module) {
  main();
}
