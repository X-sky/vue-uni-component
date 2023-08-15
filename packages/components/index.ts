import components from "./components";
export * from "./UniTemplate";

const install = (app: any) => {
  components.forEach((c) => app.use(c));
};

const defaultExport = {
  install
}

export {
  defaultExport as default,
  install
}