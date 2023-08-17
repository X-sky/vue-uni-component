import { defineConfig } from "vite";
import vue27 from "@vitejs/plugin-vue2";
import { merge } from "lodash-es";
import { getBasicContainerViteConfig } from "../../utils";

const customConfig = defineConfig({
  plugins: [vue27()],
  server: {
    port: 2700,
  },
});

export default merge(getBasicContainerViteConfig("v2.7"), customConfig);
