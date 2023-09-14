<template>
  <div :class="['space', vertical && 'is-vertical']">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  vertical: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang="less" scoped>
.space {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px 16px;

  &.is-vertical {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
