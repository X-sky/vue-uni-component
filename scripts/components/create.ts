import { dirname, resolve } from "node:path";
import FastGlob from "fast-glob";
import { camelCase, capitalize, remove } from "lodash-es";
import prompts from "prompts";
import {
  COMPONENTS_ROOT,
  COMPONENTS_TEST_ROOT,
  PACKAGES_ROOT,
  UI_TEMPLATE_META,
  buildLog,
} from "~/utils";
import { existsSync, mkdirSync, readFile, writeFile } from "fs-extra";
import { getRelativeTestName } from "./common";
import { rewriteRelatedFiles } from "./rewrite";

const toUpperCamelCase = (str: string): string => {
  if (!str) return "";
  return `${capitalize(str[0])}${camelCase(str).slice(1)}`;
};

async function getComponentName() {
  const existedComponentDirNames = await FastGlob("*", {
    cwd: COMPONENTS_ROOT,
    onlyDirectories: true,
  });

  const res = await prompts({
    type: "text",
    name: "name",
    message: "Component Name",
    format: toUpperCamelCase,
    validate(val: string) {
      if (!val.startsWith("Uni")) {
        return `Component Name should start with "Uni"`;
      }
      const upperCamelCaseName = toUpperCamelCase(val);
      if (upperCamelCaseName !== val) {
        return `Component Name should be UpperCamelCase`;
      }
      if (existedComponentDirNames.includes(val)) {
        return `Existed Component Name "${val}". Try another one`;
      }
      return true;
    },
  });
  return res.name;
}

function replaceTemplateName(content: string, name: string) {
  return content.replace(/##.*?##/g, name);
}

const failCbFactory = () => {
  let errFlag = false;
  return async function (err: unknown) {
    if (errFlag) return;
    errFlag = true;
    const relatedDirs = await FastGlob("**/*", {
      cwd: PACKAGES_ROOT,
      onlyDirectories: true,
      absolute: true,
    });
    relatedDirs.forEach((dir) => {
      // create failed remove created dir
      remove(dir);
    });
    buildLog.error(`created failed: ${err}`);
  };
};

const failCallback = failCbFactory();

/** create component */
async function createTemplate(name: string) {
  const targetCompRoot = resolve(COMPONENTS_ROOT, name);
  try {
    if (!existsSync(targetCompRoot)) {
      mkdirSync(targetCompRoot);
    }
    // change placeholder in template with name
    const tplFiles = await FastGlob("**/*", {
      cwd: UI_TEMPLATE_META,
      onlyFiles: true,
    });
    const taskList: Promise<unknown>[] = [];
    for (const file of tplFiles) {
      const relativeFileDir = dirname(file);
      const baseFileName = replaceTemplateName(file.replace(".txt", ""), name);
      const targetFileDir = resolve(targetCompRoot, relativeFileDir);
      const targetFilePath = resolve(targetCompRoot, baseFileName);
      const sourceFilePath = resolve(UI_TEMPLATE_META, file);
      const task = new Promise((resolve, reject) => {
        readFile(sourceFilePath, (err, data) => {
          if (err) {
            reject(err);
          } else {
            if (!existsSync(targetFileDir)) {
              mkdirSync(targetFileDir);
            }
            writeFile(
              targetFilePath,
              replaceTemplateName(data.toString(), name)
            ).then(() => {
              resolve(name);
            });
          }
        });
      });
      taskList.push(task);
    }
    await Promise.all(taskList);
  } catch (err) {
    failCallback(err);
  }
}

async function createTestUnit(upperCasedName: string) {
  const testName = getRelativeTestName(upperCasedName);
  const targetFileDir = resolve(COMPONENTS_TEST_ROOT, testName);
  const targetVueFile = resolve(targetFileDir, `${testName}.vue`);
  const targetVueTplStr = `
<script lang="ts" setup>
  import { ref } from 'vue-demi';
  const tempRef = ref(0);
</script>
<template>
  <div>
    {{ tempRef }}
  </div>
</template>
  `;
  if (!existsSync(targetFileDir)) {
    mkdirSync(targetFileDir);
  }
  await writeFile(targetVueFile, targetVueTplStr);
}

async function init() {
  try {
    const name = await getComponentName();
    if (!name) {
      throw "process aborted";
    }
    await Promise.all([createTemplate(name), createTestUnit(name)]);
    await rewriteRelatedFiles();
    buildLog.success(`Component ${name} created`);
  } catch (err) {
    buildLog.error(`create failed: ${err}`);
  }
}

init();
