import type { Plugin } from "vue-demi";

export type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T>(name: string, comp: T) => {
  const main = comp as SFCWithInstall<T>;
  main.install = (app: any) => app.component(name, main);
  return main;
};
