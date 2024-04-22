import { resolve } from "node:path";
import {
  PACKAGES_ROOT,
  ROOT_DIR,
  getVueDemiEntry,
  getVueEntry,
  getVueTestEntry,
} from "./path";
import { MONO_LIB_PREFIX, VersionType } from "../meta/constants";

type AliasSymbols = "~" | `${typeof MONO_LIB_PREFIX}/${string}`;

export const getCommonAlias = (): Record<AliasSymbols, string> => ({
  "~": ROOT_DIR,
  [`${MONO_LIB_PREFIX}/utils`]: resolve(PACKAGES_ROOT, "utils/index.ts"),
  [`${MONO_LIB_PREFIX}/components`]: resolve(
    PACKAGES_ROOT,
    "components/index.ts"
  ),
  [`${MONO_LIB_PREFIX}/components-test`]: resolve(
    PACKAGES_ROOT,
    "components-test/index.ts"
  ),
});

export const getVueLibAliases = (v: VersionType) => ({
  "vue-demi": getVueDemiEntry(v),
  vue: getVueEntry(v),
});

export const getVueLibTestAliases = (v: VersionType) => ({
  "@vue/test-utils": getVueTestEntry(v === "v2.7" ? "v2" : v),
});
