import * as components from "./components";
export * from "./components";

const install = (app: any) => {
  for (const name in components) {
    app.use(components[name as keyof typeof components]);
  }
  // components.forEach((c) => app.use(c));
};

const defaultExport = {
  install,
};

export { defaultExport as default, install };
