import { dirname, resolve } from "node:path";
import prompts from "prompts";
import fg from "fast-glob";
import { COMPONENTS_ROOT, UI_TEMPLATE_META, buildLog } from "~/utils";
import { camelCase, capitalize } from "lodash-es";
import { existsSync, mkdirSync, readFile, remove, writeFile } from "fs-extra";

async function getComponentName() {
  const existedComponentDirNames = await fg("*", {
    cwd: COMPONENTS_ROOT,
    onlyDirectories: true,
  });
  const toUpperCamelCase = (str: string): string => {
    if (!str) return str;
    return `${capitalize(str[0])}${camelCase(str).slice(1)}`;
  };
  const res = await prompts({
    type: "text",
    name: "name",
    message: "Component Name",
    format: toUpperCamelCase,
    validate(val) {
      const upperCamelCaseName = toUpperCamelCase(val);
      if (upperCamelCaseName !== val) {
        return `Component Name should be UpperCamelCase`;
      }
      if (existedComponentDirNames.includes(val)) {
        return `Existed Component Name "${val}". Try another name`;
      }
      return true;
    },
  });
  return res.name;
}

function replaceTemplateName(content: string, name: string) {
  return content.replace(/##.*?##/g, name);
}
async function createTemplate(name: string) {
  let errFlag = false;
  const targetCompRoot = resolve(COMPONENTS_ROOT, name);
  const failCallback = (err: unknown) => {
    if (errFlag) return;
    errFlag = true;
    // create failed, remove created dir
    if (existsSync(targetCompRoot)) {
      remove(targetCompRoot);
    }
    buildLog.error(`created failed: ${err}`);
  };
  try {
    if (!existsSync(targetCompRoot)) {
      mkdirSync(targetCompRoot);
    }
    // change placeholder in template with name
    const tplFiles = await fg("**/*", {
      cwd: UI_TEMPLATE_META,
      onlyFiles: true,
    });
    for (const file of tplFiles) {
      const relativeFileDir = dirname(file);
      const baseFileName = replaceTemplateName(file.replace(".txt", ""), name);
      const targetFileDir = resolve(targetCompRoot, relativeFileDir);
      const targetFilePath = resolve(targetCompRoot, baseFileName);
      const sourceFilePath = resolve(UI_TEMPLATE_META, file);
      readFile(sourceFilePath, (err, data) => {
        if (err) {
          failCallback(err);
        } else {
          if (!existsSync(targetFileDir)) {
            mkdirSync(targetFileDir);
          }
          writeFile(targetFilePath, replaceTemplateName(data.toString(), name));
        }
      });
    }
    // TODO: add component to components.ts
  } catch (err) {
    failCallback(err);
  }
}

async function init() {
  try {
    const name = await getComponentName();
    await createTemplate(name);
  } catch (error) {
    buildLog.log(`create failed: ${error}`);
    return;
  }
}

init();
