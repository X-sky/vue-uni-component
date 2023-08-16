import { assign } from "lodash";
import { computed } from "vue-demi";

const THEME_CONFIG = {
  "--ui-color-brand-main": "#1d46f7",
  "--ui-color-brand-sub": "#7444f8",
  "--ui-color-warn": "#ff7429",
  "--ui-color-success": "#00bc6a",
  "--ui-color-danger": "#f5353f",
  "--ui-color-info": "#b4b9bf",
  "--ui-color-font-primary": "#07172b",
  "--ui-color-font-regular": "#515c6a",
  "--ui-color-font-secondary": "#828a95",
  "--ui-color-font-placeholder": "#cdd1d5",
  "--ui-color-border-primary": "#dadcdf",
  "--ui-color-border-light": "#e6e7e9",
  "--ui-color-border-lighter": "#f0f1f3",
  "--ui-color-border-extra-light": "#f5f6f7",
  "--ui-color-background-header": "#f0f1f3",
  "--ui-color-background-bottom": "#f7f8ff",
  "--ui-color-shadow": "#07172b",
} as const;

type ThemeVariables = keyof typeof THEME_CONFIG;

export function useThemeVariables() {
  // TODO: add calculated color
  return computed<Record<ThemeVariables, string>>(() => assign({}, THEME_CONFIG));
}
