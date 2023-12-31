import { ref } from "vue-demi";

export function useCalc() {
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
