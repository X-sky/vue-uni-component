import { defineConfig } from "vite";
import vue3 from "@vitejs/plugin-vue";
import { merge } from "lodash";
import { getBasicContainerViteConfig } from "../../utils";

const config = getBasicContainerViteConfig("v3");

const customConfig = defineConfig({
  plugins: [vue3()],
  server: {
    port: 3000,
  },
});

export default merge({}, config, customConfig);