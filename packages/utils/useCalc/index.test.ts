import { test, expect } from "vitest";
import { useCalc } from "./index";

test("useCalc hook test", () => {
  const { num, increase, decrease } = useCalc();
  expect(num.value).toBe(0);
  increase();
  expect(num.value).toBe(1);
  decrease();
  expect(num.value).toBe(0);
});
