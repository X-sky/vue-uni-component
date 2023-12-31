import { resolve } from "node:path";
import { defineConfig } from "vite";
import { createVuePlugin as vue2 } from "vite-plugin-vue2";
import setupScriptPlugin from "unplugin-vue2-script-setup/vite";
import { merge } from "lodash-es";
import { getBasicContainerViteConfig } from "../../utils";

const customConfig = defineConfig({
  plugins: [vue2(), setupScriptPlugin({})],
  server: {
    port: 2000,
  },
  resolve: {
    alias: {
      "@vue/composition-api": resolve(
        __dirname,
        "node_modules/@vue/composition-api"
      ),
    },
  },
});

export default merge(getBasicContainerViteConfig("v2"), customConfig);
