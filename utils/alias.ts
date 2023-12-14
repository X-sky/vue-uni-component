import { resolve } from "node:path";
import { PACKAGES_ROOT, ROOT_DIR } from "./path";
import { MONO_LIB_PREFIX } from "../meta/constants";

type AliasSymbols = '~' | `${typeof MONO_LIB_PREFIX}/${string}`

export const getCommonAlias = (): Record<AliasSymbols, string> => ({
  "~": ROOT_DIR,
  [`${MONO_LIB_PREFIX}/utils`]: resolve(PACKAGES_ROOT, "utils/index.ts"),
  [`${MONO_LIB_PREFIX}/components`]: resolve(PACKAGES_ROOT, "components/index.ts"),
  [`${MONO_LIB_PREFIX}/components-test`]: resolve(PACKAGES_ROOT, "components-test/index.ts"),
});
