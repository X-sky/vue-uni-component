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
  <div>
    <h1 class="uni-header">
      {{ title }}
    </h1>
    <div>
      <button @click="increase">+</button>
      <span>{{ num }}</span>
      <button @click="decrease">-</button>
    </div>
  </div>
</template>
<style scoped>
  .uni-header {
    color: var(--uu-color-warn)
  }
</style>
