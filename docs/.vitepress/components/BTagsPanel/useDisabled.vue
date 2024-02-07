<template>
    <BTagsPanel v-model:tags="tags" :disabled="true"></BTagsPanel>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { BTagsPanel } from '@fesjs/traction-widget';

const tags = ref<string[]>(['默认标签1', '默认标签2']);

</script>
