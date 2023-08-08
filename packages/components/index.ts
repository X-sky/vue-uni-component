import components from "./components";
export * from "./UniTemplate";

export const install = (app: any) => {
  components.forEach((c) => app.use(c));
};

export default {
  install
}