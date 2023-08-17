import fg from "fast-glob";
import {
  buildLog,
  CDN_CONTAINER_DIST_PATH,
  getCdnFileDistPath,
  getComponentLibOutputDir,
  ROOT_DIR,
} from "../../utils";
import { copyFile, removeSync } from "fs-extra";
import { mkdirSync } from "fs-extra";
import { extname, resolve } from "node:path";

/** 拷贝style文件，拷贝其中一个即可 */
async function copyStyleFile(){
  const mainCssName = 'style.css';
  const sourceFile = resolve(getComponentLibOutputDir('v2'), mainCssName);
  const targetFilePath = getCdnFileDistPath(mainCssName);
  await copyFile(sourceFile, targetFilePath)
}

export async function prepareCdnDevEnv() {
  try {
    buildLog.start("prepare cdn dev env");
    buildLog.info("copy latest iife files to cdn-playground");
    const sourceFiles = await fg("dist/**/*.iife.js", {
      onlyFiles: true,
      cwd: ROOT_DIR,
      absolute: true,
    });
    const taskList: Promise<void>[] = [];
    removeSync(CDN_CONTAINER_DIST_PATH);
    mkdirSync(CDN_CONTAINER_DIST_PATH);
    // copy iife
    sourceFiles.forEach((filePath) => {
      const ext = extname(filePath);
      const filePathList = filePath.split("/");
      const cdnFileName = `index_${filePathList[filePathList.length - 2]}${ext}`;
      const targetFilePath = getCdnFileDistPath(cdnFileName);
      taskList.push(copyFile(filePath, targetFilePath));
    });
    // copy style
    taskList.push(copyStyleFile());
    await Promise.all(taskList);
    buildLog.success("iife and style files copied");
  } catch (e) {
    buildLog.error(e);
  }
}

if (require.main === module) {
  prepareCdnDevEnv();
}
