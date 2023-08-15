import { resolve } from "node:path";
import { PACKAGES_ROOT, ROOT_DIR } from "./path";

type AliasSymbols = '~' | `@vue-uni-ui/${string}`

export const getCommonAlias = (): Record<AliasSymbols, string> => ({
  "~": ROOT_DIR,
  "@vue-uni-ui/utils": resolve(PACKAGES_ROOT, "utils/index.ts"),
});
