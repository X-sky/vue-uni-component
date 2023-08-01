<script lang="ts" setup>
import { computed, ref, version } from 'vue-demi';

const props = withDefaults(
  defineProps<{
    msg: string;
  }>(),
  {
    msg: "Hello",
  }
);
const num = ref(0);
const increase = ()=>{
  num.value++;
}
const decrease = ()=>{
  num.value--;
}

const title = computed(()=>`${props.msg}, Vue@${version}`);
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
