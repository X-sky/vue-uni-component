<script lang="ts" setup>
import { computed } from "vue-demi";
import { IconType, IconName, getImgIconSrc } from "./icon";
import { useThemeVariables } from "@vue-uni-ui/utils";
const props = defineProps<{
  icon: IconName;
  type?: IconType;
  /** hex or rgb */
  color?: string;
}>();
const imgIconSrc = computed(() => getImgIconSrc(props.icon));
const fontIconClass = computed(() => `icon-${props.icon}`);
const themeVariables = useThemeVariables();
const iconTypeColor = computed(() => {
  switch (props.type) {
    case "primary":
      return themeVariables.value["--uu-color-brand-main"];
    case "success":
      return themeVariables.value["--uu-color-success"];
    case "warn":
      return themeVariables.value["--uu-color-warn"];
    case "danger":
      return themeVariables.value["--uu-color-danger"];
    default:
      return 'inherit';
  }
});
const iconStyle = computed(() => ({
  color: props.color || iconTypeColor.value,
}));
</script>
<template>
  <img v-if="imgIconSrc" :src="imgIconSrc" alt="" class="uu-icon" />
  <i
    v-else
    :class="['uu-icon', 'iconfont', fontIconClass]"
    :style="iconStyle"
  ></i>
</template>
<style lang="scss">
@import "./assets/font/iconfont.scss";
@import "./assets/font/iconfont-fixed.scss";

.uu-icon {
  width: 1em;
  height: 1em;
  font-size: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}
</style>
