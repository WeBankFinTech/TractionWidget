<template>
    <BTagsPanel v-model:tags="tags" :editabled="true"></BTagsPanel>
    <br>
    当前tag列表：{{ tags }}
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { BTagsPanel } from '@fesjs/traction-widget';

const tags = ref<string[]>(['默认标签1', '默认标签2']);

</script>
