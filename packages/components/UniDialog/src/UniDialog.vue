<script lang="ts" setup>
import { useUniTheme } from "@vue-uni-ui/utils";
useUniTheme();


withDefaults(
  defineProps<{
    mask: boolean;
    visible: boolean;
  }>(),
  {
    mask: false,
  }
);
</script>
<template>
  <div class="uu-dialog">
    <div v-if="mask" class="uu-dialog__mask"></div>
    <div class="uu-dialog__container">
      我是个平凡的弹窗
    </div>
  </div>
</template>
<style lang="scss">
.uu-dialog {
  &__mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: var(--uu-color-info);
    filter: blur(4px);
    opacity: 0.3
  }
  &__container {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 2;
    color: var(--uu-color-danger);
    transform: translate(-50%, -50%);
  }
}
</style>
