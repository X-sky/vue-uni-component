import { VersionType } from "../constants";

const runtimeDeclareHeaderV3 = `
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ## component ##   
  }
}
`;

const runtimeDeclareHeaderV2 = `
declare module '@vue/runtime-dom' {
  export interface GlobalComponents {
    ## component ##   
  }
}
`;

const runtimeDeclareHeaderV27 = `
declare module 'vue' {
  export interface GlobalComponents {
    ## component ##   
  }
}
`;

export const genGlobalTypes = (version: VersionType, content: string) => {
  let template = "";
  switch (version) {
    case "v2":
      template = runtimeDeclareHeaderV2;
      break;
    case "v2.7":
      template = runtimeDeclareHeaderV27;
      break;
    default:
      template = runtimeDeclareHeaderV3;
      break;
  }
  return template.replace(/##.*##/, content);
};
