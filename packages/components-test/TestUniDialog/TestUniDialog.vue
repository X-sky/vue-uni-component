<script lang="ts" setup>
import { UniDialog } from "@vue-uni-ui/components";
import { ref } from "vue-demi";
const visible = ref(false);
const updateVisible = (v: boolean) => {
  visible.value = v;
};
const openUniDialog = () => {
  visible.value = true;
};
</script>
<template>
  <div>
    <UniDialog :visible="visible" @update:visible="updateVisible">
      I'm a simple Dialog
    </UniDialog>
    <button @click="openUniDialog">Click to open UniDialog</button>
  </div>
</template>
