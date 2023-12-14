import FastGlob from "fast-glob";
import { writeFile } from "fs-extra";
import { basename, resolve, extname } from "path";
import {
  COMPONENTS_ROOT,
  COMPONENTS_TEST_ENTRY,
  COMPONENTS_TEST_ROOT,
} from "~/utils";

function getPackageComponentsExportStr(nameList: string[]) {
  return nameList
    .reduce((acc, cur) => {
      acc += `\nexport * from './${cur}';`;
      return acc;
    }, "")
    .slice(1);
}

/** rewrite packages/components/components.ts */
async function rewriteComponentsExport() {
  const componentsPath = await FastGlob("!(node_modules|dist|utils|style)", {
    cwd: COMPONENTS_ROOT,
    onlyDirectories: true,
  });
  const targetFilePath = resolve(COMPONENTS_ROOT, "components.ts");
  const content = getPackageComponentsExportStr(componentsPath);
  await writeFile(targetFilePath, content);
}

async function rewriteComponentTestExport() {
  const testComponentsPath = await FastGlob("!(node_modules)/*.vue", {
    cwd: COMPONENTS_TEST_ROOT,
    onlyFiles: true,
  });
  let importStr = "";
  let exportNameStr = "";
  testComponentsPath.forEach((cur) => {
    const fileBaseName = basename(cur);
    const extName = extname(cur);
    const fileName = fileBaseName.replace(extName, "");
    importStr += `\nimport ${fileName} from "./${cur}"`;
    exportNameStr += `, ${fileName}`;
  });
  importStr = importStr.slice(1);
  exportNameStr = exportNameStr.slice(2);
  const fileContent = `
${importStr}
export { ${exportNameStr} };
  `;
  await writeFile(COMPONENTS_TEST_ENTRY, fileContent);
}

export function rewriteRelatedFiles() {
  return Promise.all([rewriteComponentsExport(), rewriteComponentTestExport()]);
}
