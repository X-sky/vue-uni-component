import consola from "consola";
import fs from "fs-extra";
import { LOG_FILE_PATH } from "./path";

export const buildLog = new Proxy(consola, {
  get(target, k) {
    return Reflect.get(target, k);
  },
});

export const cleanLogFile = () => {
  fs.removeSync(LOG_FILE_PATH);
};
export const appendLogFile = (...str: string[]) => {
  const prefixLogStr = `${new Date().toString()}`;
  fs.appendFile(LOG_FILE_PATH, `${prefixLogStr}\n${str.join("\n")}`);
};
