import { computed, onMounted, ref, watch } from "vue-demi";
import { useThemeVariables } from "../theme/variables";

const GLOBAL_SHEET_ID = "uni-ui-custom-theme";

function concatThemeVariables(themeInfo: Record<string, string>): string {
  return Object.getOwnPropertyNames(themeInfo)
    .reduce((acc, name) => {
      acc += `;${name}:${themeInfo[name]}`;
      return acc;
    }, "")
    .slice(1);
}

export function useUniTheme() {
  const styleEl = ref<HTMLStyleElement>();
  const lastRuleIdx = ref<number>();
  const themeVariables = useThemeVariables();
  const themeVariableStr = computed(() =>
    concatThemeVariables(themeVariables.value)
  );
  /** init custom style sheet with variables */
  const initStyleSheet = () => {
    if (!styleEl.value) {
      styleEl.value = document.createElement("style");
      styleEl.value.id = GLOBAL_SHEET_ID;
      document.head.appendChild(styleEl.value);
    }
  };
  /** clear last cache */
  const clearSheetCache = () => {
    if (lastRuleIdx.value !== undefined) {
      styleEl.value?.sheet?.deleteRule(lastRuleIdx.value);
    }
  };

  /** update */
  const updateThemeVariables = () => {
    initStyleSheet();
    if (styleEl.value?.sheet) {
      clearSheetCache();
      lastRuleIdx.value = styleEl.value.sheet.insertRule(
        `:root{${themeVariableStr.value}}`
      );
    }
  };

  onMounted(() => {
    updateThemeVariables();
  });

  watch(themeVariableStr, () => {
    updateThemeVariables;
  });

  return {
    updateThemeVariables,
  };
}
