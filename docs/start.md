## 快速上手

1. 安装依赖
```
npm i -S @fesjs/traction-widget

```
2. 按需引入
::: code-group

```js [引入组件]
<script setup>
  import { BTagsPanel } from '@fesjs/traction-widget'
</script>

# 在需要的地方使用组件
<template>
  <BTagsPanel></BTagsPanel>
</template>

```

```js [引入函数]
<script setup>
  import { login } from '@fesjs/traction-widget'
</script>

# 在需要的地方使用函数
<scirpt setup>
  import { onMounted } from 'vue';
  onMounted(() => {
    login()
  });
</scirpt>
```
详细组件说明请移步<a href="components/BTagsPanel" rel="noreferrer">组件</a> <br />
详细函数说明请移步<a href="utils/isIE" rel="noreferrer">函数</a>
:::
