<template>
    <div :class="layout === 'drawer' ? 'wd-table-drawer' : 'wd-table-page'">
        <slot name="search"></slot>
        <FDivider v-if="isDivider" style="margin-top: 0px"></FDivider>
        <div v-if="slotTest" class="operate">
            <FSpace :size="16">
                <slot name="operate"></slot>
            </FSpace>
        </div>
        <PageLoading  v-if="props.isLoading || props.actionType !=='loading'" :actionType="props.actionType" :loadingText="props.loadingText"></PageLoading>
        <template v-else>
            <div class="table-container">
                <slot name="table"></slot>
            </div>
            <div class="table-pagination-container">
                <slot name="pagination"></slot>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">

import { defineProps, PropType, useSlots } from 'vue';
import PageLoading from '../PageLoading/pageLoading.vue';
import { FSpace, FDivider } from '@fesjs/fes-design';

const slotTest = !!useSlots().operate;
const props = defineProps({
    // 表格是否加载
    isLoading: {
        type: Boolean,
        require: true,
        default: false
    },
    actionType: {
        type: String as PropType<'loading' | 'emptyInitResult' | 'emptyQueryResult'>,
        require: false,
        default: 'loading'
    },
    loadingText: {
        type: Object as PropType<{
            loading?: string,
            emptyInitResult?: string,
            emptyQueryResult?: string
        }>,
        require: false,
        default: () => ({
            loading: 'Loading. . .',
            emptyInitResult: '这里还没有数据. . .',
            emptyQueryResult: '没有符合条件的结果. . .'
        })
    },
    // 布局类型 页面-page,抽屉-drawer
    layout: {
        type: String,
        require: false,
        default: 'page'
    },
    // 是否有分割线
    isDivider: {
        type: Boolean,
        require: false,
        default: true
    }
});

</script>

<script lang="ts">
export default {
    name: 'BTablePage'
};
</script>
