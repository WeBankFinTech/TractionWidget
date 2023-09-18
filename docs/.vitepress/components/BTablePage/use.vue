<template>
    <div>
        <BTablePage :isLoading="isLoading" :actionType="actionType" :loadingText="loadingText">
            <template v-slot:search>
                <BSearch v-model:form="searchForm"  @search="handleSearch" @reset="handleReset">
                    <template v-slot:form>
                        <div>
                            <span class="condition-label">ID</span>
                            <FInput v-model="searchForm.id" placeholder="请输入">
                            </FInput>
                        </div>
                        <div>
                            <span class="condition-label">中文名称</span>
                            <FInput v-model="searchForm.cn_name" placeholder="请输入">
                            </FInput>
                        </div>
                        <div>
                            <span class="condition-label">英文名称</span>
                            <FInput v-model="searchForm.en_name" placeholder="请输入">
                            </FInput>
                        </div>
                    </template>
                </BSearch>
            </template>
            <template v-slot:operate>
                <FButton type="primary" @click="openDrawer">BTablePage抽屉样式</FButton>
                <FButton>新增数据</FButton>
            </template>
            <template v-slot:table>
                <f-table :data="tableShowLists">
                    <f-table-column prop="id" label="ID" :width="80" ellipsis />
                    <f-table-column prop="cn_name" label="中文名称" :width="160" ellipsis />
                    <f-table-column prop="en_name" label="英文名称" :width="160" ellipsis />
                    <f-table-column prop="desc" label="描述" :width="160" ellipsis />
                    <f-table-column label="操作" :width="100"  align="center" fixed="right" ellipsis :action="tableAction"></f-table-column>
                </f-table>
            </template>
            <template v-slot:pagination>
                <FPagination
                    v-model:currentPage="pagination.current"
                    v-model:pageSize="pagination.size"
                    show-size-changer
                    show-total
                    :total-count="pagination.total"
                    @change="fetchTableData"
                    @pageSizeChange="fetchTableData" />  
            </template>
        </BTablePage>
        <FDrawer
            v-model:show="showDrawer"
            title="这里是抽屉"
            displayDirective="if"
            width=50%
        >
            <div>
                <BTablePage :isLoading="isLoading" :actionType="actionType" layout="drawer" :isDivider="true">
                    <template v-slot:search>
                        <BSearch v-model:form="searchForm"  @search="handleSearch" @reset="handleReset">
                            <template v-slot:form>
                                <div>
                                    <span class="condition-label">ID</span>
                                    <FInput v-model="searchForm.id" placeholder="请输入">
                                    </FInput>
                                </div>
                            </template>
                        </BSearch>
                    </template>
                    <template v-slot:operate>
                        <FButton>新增数据</FButton>
                    </template>
                    <template v-slot:table>
                        <f-table :data="tableShowLists">
                            <f-table-column prop="id" label="ID" :width="80" ellipsis />
                            <f-table-column prop="cn_name" label="中文名称" :width="160" ellipsis />
                            <f-table-column prop="en_name" label="英文名称" :width="160" ellipsis />
                        </f-table>
                    </template>
                    <template v-slot:pagination>
                        <FPagination
                            v-model:currentPage="pagination.current"
                            v-model:pageSize="pagination.size"
                            show-size-changer
                            show-total
                            :total-count="pagination.total"
                            @change="fetchTableData"
                            @pageSizeChange="fetchTableData" />  
                    </template>
                </BTablePage>
            </div>
        </FDrawer>
    </div>
</template>
<script setup lang="ts">
import { BTablePage, BSearch } from '@fesjs/traction-widget';
import { FInput,FButton,FTable, FTableColumn, FPagination,FDrawer } from '@fesjs/fes-design';
import { onMounted, ref, reactive, nextTick } from 'vue';

const pagination = reactive({
    current: 1,
    size: 10,
    total: 0,
});
const searchForm = ref({})
const isLoading = ref<boolean>(false);
const actionType = ref<string>('loading');
const showDrawer = ref<boolean>(false);
const loadingText = {
    loading: '自定义Loading文字',
    emptyInitResult: '这里还没有数据. . .',
    emptyQueryResult: '没有符合条件的结果. . .'
};
const generateData = () => {
    const data = [];
    for (let i=0; i<99; i++) {
        const obj = {
            id: String(i),
            cn_name: '中文名'+ i,
            en_name: '英文名'+ i,
            desc: '描述' + i,
        };
        data.push(obj);
    }
    return data
};
const tableAllLists = ref<any[]>(generateData());
const tableLists = ref<any[]>([]);
const tableShowLists = ref<any[]>([]);

const tableAction = [
            {
                label: '编辑',
                func: (row: any) => {
                    console.log(row);
                },
            },
        ];
// 获取表格数据
const fetchTableData = () => {
    isLoading.value = true;
    actionType.value = 'loading';
    setTimeout(() => {
        tableShowLists.value = tableLists.value.slice((pagination.current-1)*pagination.size, pagination.current*pagination.size);
        isLoading.value = false;
    }, 600);
    pagination.total = tableLists.value.length;
    if (pagination.total === 0) {
        actionType.value = 'emptyQueryResult';
    };
}

// 查询操作
const handleSearch = (e: any) => {
    Object.keys(searchForm.value).forEach((key) => {
        if(searchForm.value[key]) {
            tableLists.value = tableAllLists.value.filter((e) => {
                return e[key].includes(searchForm.value[key]);
            })
        }
    });
    nextTick();
    fetchTableData();
};

// 重置操作
const handleReset = () => {
    pagination.current = 1;
    tableLists.value = tableAllLists.value;
    fetchTableData();
};

// 打开抽屉
const openDrawer = () => {
    showDrawer.value = true;
};
onMounted(() => {
    tableLists.value = tableAllLists.value;
    fetchTableData();
});
</script>