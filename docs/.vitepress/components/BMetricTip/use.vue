<template>
    <span>
        一个表格
        <BMetricTip tipText="一个表格的描述"></BMetricTip>
    </span>
    <f-table :data="tableShowLists">
        <f-table-column prop="id" label="ID" :width="80" ellipsis />
        <f-table-column prop="cn_name" :width="160" ellipsis>
            <template #header>
                中文名称
                <BMetricTip :tipText="tipText"></BMetricTip>
            </template>
        </f-table-column>
        <f-table-column prop="en_name" :width="160" ellipsis>
            <template #header>
                英文名称
                <BMetricTip :tipText="tipTextEn"></BMetricTip>
            </template>
        </f-table-column>
    </f-table>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { BMetricTip } from '@fesjs/traction-widget';
import { FTable, FTableColumn } from '@fesjs/fes-design';

console.log('MetricTip 加载')
const tipText = "这是中文名称的描述"
const tipTextEn = "这是英文名称的描述这是英文名称的描述，这是英文名称的描述这是英文名称的描述，这是英文名称的描述这是英文名称的描述这是英文名称的描述这是英文名称的描述这是英文名称的描述这是英文名称的描述这是英文名称的描述这是英文名称的描述这是英文名称的描述"
const tableShowLists = ref([
    {
        id: 'id1',
        cn_name: '张三',
        en_name: 'zhansan'
    },
    {
        id: 'id2',
        cn_name: '李四',
        en_name: 'lisi'
    },
])

</script>
