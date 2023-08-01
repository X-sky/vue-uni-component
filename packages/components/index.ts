import components from "./components";
export * from "./UniTemplate";

export default {
  install(app: any) {
    components.forEach((c) => app.use(c));
  },
};
