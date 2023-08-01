<script lang="ts" setup>
import { ref } from "@vue/composition-api";

const title = ref("Vue2 App Title");
</script>
<template>
  <div>
    <h1>{{ title }}</h1>
    <uni-template />
  </div>
</template>
