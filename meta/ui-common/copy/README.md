# Vue-Uni-Component

vue 多版本统一组件库

项目的主要目标是：使用 `composition api` 的方式开发 `vue` 组件，使其能够同时在 `vue2` 以及 `vue3` 版本上运行。实现一次开发多处使用，避免因 `vue` 项目版本升级带来的组件不兼容问题

### 使用方式

1. 全局注册

```javascript
// Vue2
import Vue from "vue";
import VueUniComponent from "@vue-uni-component/v2";
import App from "./App.vue";
Vue.use(VueUniComponent);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

```javascript
// Vue3
import { createApp } from "vue";
import VueUniComponent from "@vue-uni-component/v3";
import App from "./App.vue";
createApp(App).use(createApp).mount("#app");
```

```html
<template>
  <uni-template />
</template>
```

2. 局部注册
```vue
// vue3
<script setup lang="ts">
import { UniTemplate } from '@vue-uni-component/v3';
</script>
<template>
  <UniTemplate />
</template>
```
