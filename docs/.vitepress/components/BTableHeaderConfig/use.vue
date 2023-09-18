<template>
    <div>
        <FButton @click="()=>showTableHeaderConfig = !showTableHeaderConfig" style="margin-bottom: 20px">表头设置</FButton>
        <BTableHeaderConfig :originHeaders="originHeaders" v-model:headers="headers" v-model:show="showTableHeaderConfig" type="example"></BTableHeaderConfig>
        <FTable :data="data">
            <FTableColumn prop="title" label="标题" :visible="checkTColShow('title')"></FTableColumn>
            <FTableColumn prop="content" label="内容" :visible="checkTColShow('content')"></FTableColumn>
            <FTableColumn prop="action" label="操作" v-slot="{ row }" :visible="checkTColShow('action')">
                <a href="javascript:;" @click="viewContent(row)">查看</a>
            </FTableColumn>
        </FTable>
    </div>
</template>
<script setup lang="ts">
import {
    BTableHeaderConfig
} from '@fesjs/traction-widget';
import { FTable, FTableColumn, FButton, FModal } from '@fesjs/fes-design';
import { ref } from 'vue';
// 表格全部列，hidden为true时默认隐藏
const originHeaders = ref<{prop: string, label: string, hidden?: boolean}[]>([
    { prop: 'title', label: '标题' },
    { prop: 'content', label: '内容', hidden: true },
    { prop: 'action', label: '操作' }
]);
// 用于接收当前需要展示的表头的列表
const headers = ref<{prop: string, label: string}[]>([]);
const data = [{ title: '标题1', content: '内容1' }, { title: '标题2', content: '内容2' }, { title: '标题3', content: '内容3' }];
const showTableHeaderConfig = ref<boolean>(false);
// 判断表头是否展示
const checkTColShow = (col: string) => headers.value.map((item) => item.prop).includes(col);
const viewContent = (row: {
    title: string,
    content: string,
}) => {
    FModal.confirm({
        title: '查看',
        content: row.content,
        okText: '确认'
    });
};
</script>
