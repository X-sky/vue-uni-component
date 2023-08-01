import { createApp } from "vue";
import uniComponents from "@vue-uni-ui/components";
import App from "./App.vue";

const app = createApp(App);
app.use(uniComponents);
app.mount("#app");
