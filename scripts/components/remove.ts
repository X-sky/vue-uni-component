import FastGlob from "fast-glob";
import prompts from "prompts";
import { COMPONENTS_ROOT, COMPONENTS_TEST_ROOT, buildLog } from "~/utils";
import { getRelativeTestName } from "./common";
import { resolve } from "path";
import { remove } from "fs-extra";
import { rewriteRelatedFiles } from "./rewrite";

async function getTargetRemoveComponents(): Promise<string[]> {
  const existedComponentDirNames = await FastGlob(
    "!(node_modules|dist|utils|style)",
    {
      cwd: COMPONENTS_ROOT,
      onlyDirectories: true,
    }
  );
  const res = await prompts([
    {
      type: "multiselect",
      choices: existedComponentDirNames.map((name) => ({
        title: name,
        value: name,
      })),
      name: "target",
      message: "Pick Components to remove",
    },
    {
      type: (prev) => (prev.length ? "confirm" : null),
      name: "confirmRemove",
      message() {
        return "These components will be removed from packages/components and packages/components-test, please CONFIRM to continue";
      },
    },
  ]);
  const ret = res.confirmRemove ? res.target : [];
  if (!ret.length) {
    buildLog.fail("no components selected, process exit");
  }
  return ret;
}

function removeTemplate(nameList: string[]) {
  const taskList: Promise<void>[] = [];
  nameList.forEach((name) => {
    const targetCompRoot = resolve(COMPONENTS_ROOT, name);
    taskList.push(remove(targetCompRoot));
  });
  return taskList;
}

function removeTestUnit(nameList: string[]) {
  const taskList: Promise<void>[] = [];
  nameList.forEach((name) => {
    const testName = getRelativeTestName(name);
    const targetFileDir = resolve(COMPONENTS_TEST_ROOT, testName);
    taskList.push(remove(targetFileDir));
  });
  return taskList;
}

async function init() {
  try {
    const nameList = await getTargetRemoveComponents();
    if (nameList.length) {
      await Promise.all([
        ...removeTemplate(nameList),
        ...removeTestUnit(nameList),
      ]);
      await rewriteRelatedFiles();
      const concatComponentNames = nameList.reduce((acc, cur) => {
        acc += ` ${cur}`;
        return acc;
      }, "").slice(1);
      buildLog.success(`Component ${concatComponentNames} removed`);
    }
  } catch (err) {
    buildLog.error(`remove failed: ${err}`);
  }
}

init();
