<script lang="ts" setup>
import { useUniTheme } from "@vue-uni-ui/utils";
import { CSSProperties, computed } from "vue-demi";
useUniTheme();

const props = withDefaults(
  defineProps<{
    visible: boolean;
    /** 是否展示弹窗 */
    mask: boolean;
    /** 弹窗标题 */
    title?: string;
    /** 是否展示关闭按钮 */
    showClose?: boolean;
    width?: string;
    height?: string;
    closeOnClickMask?: boolean;
  }>(),
  {
    visible: false,
    mask: false,
    showClose: true,
    closeOnClickMask: false,
  }
);
const emits = defineEmits<{
  (e: "update:visible", payload: boolean): void;
  (e: "opened"): void;
  (e: "closed"): void;
}>();

const stateVisible = computed({
  set(v: boolean) {
    emits("update:visible", v);
    if (v) {
      // open dialog
      emits("opened");
    } else {
      emits("closed");
    }
  },
  get() {
    return props.visible;
  },
});

const closeModal = () => {
  stateVisible.value = false;
};
const clickMask = () => {
  if (props.closeOnClickMask) {
    closeModal();
  }
};

const customStyle = computed<CSSProperties>(() => {
  const ret: CSSProperties = {
    width: "50%",
    height: "50%",
  };
  if (props.width) {
    ret.width = props.width;
  }
  if (props.height) {
    ret.height = props.height;
  }
  return ret;
});
</script>
<template>
  <div class="uu-dialog" v-if="stateVisible">
    <div v-if="mask" class="uu-dialog-mask" @click="clickMask"></div>
    <div class="uu-dialog-container" :style="customStyle">
      <div class="uu-dialog-header">
        <div class="uu-dialog-close-icon" @click="closeModal">x</div>
        <slot name="title">
          <span v-if="title" class="uu-dialog-header-title">
            {{ title }}
          </span>
        </slot>
      </div>
      <div class="uu-dialog-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
$dialogPaddingX: 20px;
$headerHeight: 60px;

.uu-dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: var(--uu-color-info);
  filter: blur(4px);
  opacity: 0.3;
}
.uu-dialog-container {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2;
  color: var(--uu-color-font-primary);
  transform: translate(-50%, -50%);
  padding: 0 $dialogPaddingX;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.09);
  border-radius: 8px;
  overflow: hidden;
}
.uu-dialog-content {
  padding-top: $headerHeight;
  height: calc(100% - $headerHeight);
  overflow: auto;
}
.uu-dialog-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: $headerHeight;
  box-sizing: border-box;
  padding: 20px $dialogPaddingX 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.uu-dialog-header-title {
  flex: 1;
  font-size: 16px;
  color: var(--uu-color-font-primary);
  font-weight: 500;
}
.uu-dialog-close-icon {
  position: absolute;
  top: 15px;
  right: 21px;
  font-size: 16px;
  color: var(--uu-color-font-regular);
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}
</style>
