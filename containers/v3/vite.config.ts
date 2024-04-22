import { defineConfig } from "vite";
import vue3 from "@vitejs/plugin-vue";
import { mergeViteConfig } from "../../utils";

const customConfig = defineConfig({
  plugins: [vue3()],
  server: {
    port: 3000,
  },
});

export default mergeViteConfig({
  vueVersion: "v3",
  ...customConfig,
});
