import fg from "fast-glob";
import {
  buildLog,
  CDN_CONTAINER_DIST_PATH,
  getCdnFileDistPath,
  ROOT_DIR,
} from "../../utils";
import { copyFile, removeSync } from "fs-extra";
import { mkdirSync } from "fs-extra";
import { extname } from "node:path";

export async function prepareCdnDevEnv() {
  try {
    buildLog.start("prepare cdn dev env");
    buildLog.info("copy latest iife files to cdn-playground");
    const sourceFiles = await fg("dist/**/(*.iife.js|style.css)", {
      onlyFiles: true,
      cwd: ROOT_DIR,
      absolute: true,
    });
    const taskList: Promise<void>[] = [];
    removeSync(CDN_CONTAINER_DIST_PATH);
    mkdirSync(CDN_CONTAINER_DIST_PATH);
    sourceFiles.forEach((filePath) => {
      const ext = extname(filePath);
      const filePathList = filePath.split("/");
      const cdnFileName = `index_${filePathList[filePathList.length - 2]}${ext}`;
      const targetFilePath = getCdnFileDistPath(cdnFileName);
      taskList.push(copyFile(filePath, targetFilePath));
    });
    await Promise.all(taskList);
    buildLog.success("iife files copied");
  } catch (e) {
    buildLog.error(e);
  }
}

if (require.main === module) {
  prepareCdnDevEnv();
}
