import { assign } from "lodash-es";
import { computed } from "vue-demi";

const THEME_CONFIG = {
  [`--uu-color-brand-main`]: "#1d46f7",
  [`--uu-color-brand-sub`]: "#7444f8",
  [`--uu-color-warn`]: "#ff7429",
  [`--uu-color-success`]: "#00bc6a",
  [`--uu-color-danger`]: "#f5353f",
  [`--uu-color-info`]: "#b4b9bf",
  [`--uu-color-font-primary`]: "#07172b",
  [`--uu-color-font-regular`]: "#515c6a",
  [`--uu-color-font-secondary`]: "#828a95",
  [`--uu-color-font-placeholder`]: "#cdd1d5",
  [`--uu-color-border-primary`]: "#dadcdf",
  [`--uu-color-border-light`]: "#e6e7e9",
  [`--uu-color-border-lighter`]: "#f0f1f3",
  [`--uu-color-border-extra-light`]: "#f5f6f7",
  [`--uu-color-background-header`]: "#f0f1f3",
  [`--uu-color-background-bottom`]: "#f7f8ff",
  [`--uu-color-mask`]: "#07172b",
} as const;

export function useThemeVariables() {
  // TODO: add calculated color
  return computed(() => assign({}, THEME_CONFIG));
}
