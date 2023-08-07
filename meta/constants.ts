const VALID_COMP_VERSIONS = ['2', '2.7', '3'] as const;
const COMP_VERSION_PREFIX = 'v';
export type Version = typeof VALID_COMP_VERSIONS[number];
export type VersionType = `${typeof COMP_VERSION_PREFIX}${Version}`;
export function isValidVersionType(str: string): str is VersionType{
  const version = str.replace(COMP_VERSION_PREFIX, '');
  return str.startsWith(COMP_VERSION_PREFIX) && VALID_COMP_VERSIONS.includes(version as any);
}

export type ComponentLibNameType = `@vue-uni-component/${VersionType}`;

export const IIFE_NAME = "__VUE_UNI_COMP__";

export const getComponentLibName = (version: VersionType) =>
  `@vue-uni-component/${version}`;
