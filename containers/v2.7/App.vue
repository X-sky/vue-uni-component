<script lang="ts" setup>
import { ref } from "vue";

const title = ref("Vue2.7 App Title");
</script>
<template>
  <div>
    <h1>{{ title }}</h1>
    <uni-template />
  </div>
</template>
