<script lang="ts" setup>
import { ref } from "@vue/composition-api";
import { TestUniDialog, TestUniIcon } from "@vue-uni-ui/components-test";
const title = ref("Vue2 App Title");
</script>
<template>
  <div>
    <h1>{{ title }}</h1>
    <TestUniDialog />
    <TestUniIcon />
  </div>
</template>
