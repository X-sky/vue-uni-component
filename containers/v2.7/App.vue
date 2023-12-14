<script lang="ts" setup>
import { ref } from "vue";
import TestUniDialog from "../../packages/components-test/TestUniDialog/TestUniDialog.vue";

const title = ref("Vue2.7 App Title");
</script>
<template>
  <div>
    <h1>{{ title }}</h1>
    <TestUniDialog />
  </div>
</template>
