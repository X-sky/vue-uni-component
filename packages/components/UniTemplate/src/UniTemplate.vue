<script lang="ts" setup>
import { computed, version } from "vue-demi";
import { useCalc } from "@vue-uni-ui/utils";

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
    <h1>
      {{ title }}
    </h1>
    <div>
      <button @click="increase">+</button>
      <span>{{ num }}</span>
      <button @click="decrease">-</button>
    </div>
  </div>
</template>
