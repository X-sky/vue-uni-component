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
const openHandler = () => {
  console.log("🚀 ~ file: TestUniDialog.vue:14 ~ openHandler ~ openHandler:");
};
const closeHandler = () => {
  console.log("🚀 ~ file: TestUniDialog.vue:14 ~ closeHandler ~ closeHandler:");
};
</script>
<template>
  <div>
    <UniDialog
      :visible="visible"
      @update:visible="updateVisible"
      @open="openHandler"
      @close="closeHandler"
      mask
      close-on-click-mask
    >
      I'm a simple Dialog
    </UniDialog>
    <button @click="openUniDialog">Click to open UniDialog</button>
  </div>
</template>
