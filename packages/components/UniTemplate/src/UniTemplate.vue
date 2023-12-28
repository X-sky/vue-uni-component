<script lang="ts" setup>
import { computed, version } from "vue-demi";
import { useCalc, useUniTheme } from "@vue-uni-ui/utils";

useUniTheme();

const props = withDefaults(
  defineProps<{
    msg: string;
  }>(),
  {
    msg: "Hello",
  }
);
const { num, increase, decrease } = useCalc();

const title = computed(() => `${props.msg}, Vue@${version}`);
</script>
<template>
  <div class="uu-template">
    <h1 class="uu-template__header">
      {{ title }}
    </h1>
    <div>
      <button @click="increase" data-test="increase">+</button>
      <span data-test="num">{{ num }}</span>
      <button @click="decrease" data-test="decrease">-</button>
    </div>
  </div>
</template>
<style lang="scss">
.uu-template {
  &__header {
    color: var(--uu-color-warn);
  }
}
</style>
