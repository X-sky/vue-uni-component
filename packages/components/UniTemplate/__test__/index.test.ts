import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import UniTemplate from "../src/UniTemplate.vue";

describe("test UniTemplate", () => {
  const incBtnSelector = "[data-test=increase]";
  const decBtnSelector = "[data-test=decrease]";
  const numContentSelector = "[data-test=num]";
  test("test default", async () => {
    const testMsg = "test message";
    const wrapper = mount(UniTemplate, {
      // use propsData instead of props for backwards compatibility
      propsData: {
        msg: testMsg,
      },
    });
    const title = wrapper.find(".uu-template__header");
    const incBtn = wrapper.find(incBtnSelector);
    const decBtn = wrapper.find(decBtnSelector);
    const num = wrapper.find(numContentSelector);
    // default show hello
    expect(title.text()).toContain(testMsg);
    expect(parseInt(num.text())).toBe(0);
    await incBtn.trigger("click");
    expect(parseInt(num.text())).toBe(1);
    await decBtn.trigger("click");
    expect(parseInt(num.text())).toBe(0);
  });
});
