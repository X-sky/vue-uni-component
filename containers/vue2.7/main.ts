import Vue from "vue";
import uniComponents from "@vue-uni-ui/components";
import App from "./App.vue";

Vue.use(uniComponents);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
