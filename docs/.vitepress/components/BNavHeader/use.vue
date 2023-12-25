<template>
    <div>
        <BNavHeader title="顶部栏标题" @back="handleBack">
            <template v-slot:suffix>
                <div>后缀内容</div>
            </template>
        </BNavHeader>
        <div class="eg-page">页面内容</div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch, h } from 'vue';
import { BNavHeader } from '@fesjs/traction-widget';
import { FMessage } from '@fesjs/fes-design';
const handleBack = () => {
    FMessage.info('自定义返回逻辑');
};
</script>
<style lang='less' scoped>
.eg-page {
    padding: 24px;
    background: #fff;
    border-radius: 4px;
}
</style>