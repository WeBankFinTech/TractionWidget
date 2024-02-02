<template>
    <BTagsPanel v-model:tags="tags" regex="/^[\w\u4e00-\u9fa5-]+$/" regexTip="标签只允许输入中英文字符、数字、下划线和中划线"></BTagsPanel>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { BTagsPanel } from '@fesjs/traction-widget';

const tags = ref<string[]>(['默认标签1', '默认标签2']);

</script>
