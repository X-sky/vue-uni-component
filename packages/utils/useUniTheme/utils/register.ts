import { computed, onMounted, watch } from "vue-demi";
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

function useUniThemeFactory() {
  let styleEl: HTMLStyleElement;
  let lastRuleIdx: number;
  return function () {
    const themeVariables = useThemeVariables();
    const themeVariableStr = computed(() =>
      concatThemeVariables(themeVariables.value)
    );
    /** init custom style sheet with variables */
    const initStyleSheet = () => {
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = GLOBAL_SHEET_ID;
        document.head.appendChild(styleEl);
      }
    };
    /** clear last cache */
    const clearSheetCache = () => {
      if (lastRuleIdx !== undefined) {
        styleEl?.sheet?.deleteRule(lastRuleIdx);
      }
    };

    /** update */
    const updateThemeVariables = () => {
      initStyleSheet();
      if (styleEl?.sheet) {
        clearSheetCache();
        lastRuleIdx = styleEl.sheet.insertRule(
          `:root{${themeVariableStr.value}}`
        );
      }
    };

    onMounted(() => {
      if (!styleEl) {
        updateThemeVariables();
      }
    });

    watch(themeVariableStr, () => {
      updateThemeVariables;
    });

    return {
      themeVariables,
      updateThemeVariables,
    };
  };
}

export const useUniTheme = useUniThemeFactory();