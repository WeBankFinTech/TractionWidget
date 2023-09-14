<template>
  <div class="component-doc">
    <div class="component-doc-content">
      <slot></slot>
    </div>
    <div :class="['component-doc-code', visibleCode && 'visible-code']" v-html="code"></div>
    <div class="component-doc-header" @click="toggleCode">
      <!-- span class="play" @click="openPlayground">play</span-->
      <!-- <LeftOutlined :class="['show-code-btn', visibleCode && 'active']" @click="toggleCode" /> -->
      {{visibleCode ? '收起代码' : '查看代码'}}
      <DownOutlined :class="['show-code-btn', visibleCode && 'active']" />
    </div>
  </div>

</template>
<script setup lang="ts">
import {
    watch,
    ref
} from 'vue';
import { DownOutlined } from '@fesjs/fes-design/icon';

// import playground from './playground';
import codes from './demoCode.json';

const props = defineProps({
    code: String
});
const code = ref('');
watch(
    () => props.code,
    () => {
        code.value = codes[`${props.code}-code`];
    },
    {
        immediate: true
    }
);

const visibleCode = ref(false);
// const openPlayground = () => {
//     playground(props.code);
// };

const toggleCode = () => {
    visibleCode.value = !visibleCode.value;
};
</script>
<style lang="less" scoped>
.component-doc {
  margin-top: 16px;
  border: 1px solid #cfd0d3;
  border-radius: 4px;

  &-header {
    height: 48px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #cfd0d3;
    font-size: 14px;
    padding: 0 16px;
    cursor: pointer;

    .show-code-btn {
      cursor: pointer;
      transition: 0.3s all;
      transform-origin: center center;

      &.active {
        transform: rotateZ(-180deg);
      }
    }

    .play {
      margin-right: 20px;
      cursor: pointer;
    }
  }

  &-content {
    padding: 16px;
  }

  &-code {
    max-height: 720px;
    border-top: 1px solid #cfd0d3;
    transition: all 0.3s;
    opacity: 0;
    height: 0;
    font-size: 14px;
    overflow: auto;

    &.visible-code {
      border-radius: 4px;
      opacity: 1;
      height: auto;
      padding: 16px;
      background-color: #292d3e;
    }
  }
}
</style>
