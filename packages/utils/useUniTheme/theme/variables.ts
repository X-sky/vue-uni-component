import { assign } from "lodash-es";
import { computed } from "vue-demi";

/** 'uu' as short for uni-ui */
type CommonClassPrefix = '--uu';
type ColorClassPrefix = `${CommonClassPrefix}-color`;
const COMMON_PREFIX = "--uu";
const COLOR_PREFIX: ColorClassPrefix = `${COMMON_PREFIX}-color` as const;

const THEME_CONFIG = {
  [`${COLOR_PREFIX}-brand-main`]: "#1d46f7",
  [`${COLOR_PREFIX}-brand-sub`]: "#7444f8",
  [`${COLOR_PREFIX}-warn`]: "#ff7429",
  [`${COLOR_PREFIX}-success`]: "#00bc6a",
  [`${COLOR_PREFIX}-danger`]: "#f5353f",
  [`${COLOR_PREFIX}-info`]: "#b4b9bf",
  [`${COLOR_PREFIX}-font-primary`]: "#07172b",
  [`${COLOR_PREFIX}-font-regular`]: "#515c6a",
  [`${COLOR_PREFIX}-font-secondary`]: "#828a95",
  [`${COLOR_PREFIX}-font-placeholder`]: "#cdd1d5",
  [`${COLOR_PREFIX}-border-primary`]: "#dadcdf",
  [`${COLOR_PREFIX}-border-light`]: "#e6e7e9",
  [`${COLOR_PREFIX}-border-lighter`]: "#f0f1f3",
  [`${COLOR_PREFIX}-border-extra-light`]: "#f5f6f7",
  [`${COLOR_PREFIX}-background-header`]: "#f0f1f3",
  [`${COLOR_PREFIX}-background-bottom`]: "#f7f8ff",
  [`${COLOR_PREFIX}-mask`]: "#07172b",
} as const;

export function useThemeVariables() {
  // TODO: add calculated color
  return computed(() => assign({}, THEME_CONFIG));
}
