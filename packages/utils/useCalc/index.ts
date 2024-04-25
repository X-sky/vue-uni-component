import { ref } from "vue-demi";

export function useCalc() {
  // test for babel transformation
  const list = Array.from({
    length: 5,
  }).fill(1);
  const list2 = list.toSorted();
  const listItem = list.at(-1);
  const obj = { a: 1, b: 2 };
  const copyObj = {
    ...obj,
  };
  console.log("🚀 ~ useCalc ~ list2:", list2, listItem, copyObj);
  const num = ref(0);
  const increase = () => {
    num.value++;
  };
  const decrease = () => {
    num.value--;
  };
  return {
    num,
    increase,
    decrease,
  };
}
