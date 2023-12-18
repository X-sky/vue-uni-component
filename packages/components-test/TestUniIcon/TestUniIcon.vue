<script lang="ts" setup>
import { UniIcon } from "@vue-uni-ui/components";
</script>
<template>
  <div class="icon-set">
    <h2 class="icon-set-title">Icon Set</h2>
    <div class="icon-list">
      <UniIcon icon="close" :type="'danger'" />
      <UniIcon :icon="'github'" />
    </div>
  </div>
</template>
<style lang="scss">
.icon-set {
  width: 300px;
  border-radius: 8px;
  border: 1px solid #07172b;
  padding: 0 10px 10px;

  .icon-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    font-size: 22px;
  }
}
</style>
