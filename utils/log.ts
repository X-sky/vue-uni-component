import consola from "consola";

export const buildLog = new Proxy(consola, {
  get(target, k) {
    return Reflect.get(target, k);
  },
});
