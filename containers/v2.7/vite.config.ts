import { defineConfig } from "vite";
import vue27 from "@vitejs/plugin-vue2";
import { mergeViteConfig } from "../../utils";

const customConfig = defineConfig({
  plugins: [vue27()],
  server: {
    port: 2700,
  },
});

export default mergeViteConfig({
  vueVersion: "v2.7",
  ...customConfig,
});
