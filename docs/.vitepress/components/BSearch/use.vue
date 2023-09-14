<template>
    <BSearch v-model:form="searchForm" v-model:advanceForm="advanceSearchForm" :isAdvance='true' @search="handleSearch" @reset="handleReset" @advance="toggleAdvanceQuery">
        <template v-slot:form>
            <div>
                <span class="condition-label">姓名</span>
                <FInput v-model="searchForm.name" placeholder="请输入">
                </FInput>
            </div>
            <div>
                <span class="condition-label">年龄</span>
                <FInput v-model="searchForm.age" placeholder="请输入">
                </FInput>
            </div>
            <div>
                <span class="condition-label">性别</span>
                <FSelect v-model="searchForm.gender" :options="genderList"
                        placeholder="请选择" clearable filterable>
                </FSelect>
            </div>
        </template>
        <template v-slot:exButton>
            <FButton @click="handleEX">额外按钮1</FButton>
            <FButton @click="handleEX">额外按钮2</FButton>
        </template>
    </BSearch>
    <FModal :maskClosable="false" title="高级筛选" :show="showAdvanceQuery" @cancel="advanceCancel" @ok="advanceCancel">
        <FForm>
             <FFormItem label="手机号码">
                <FInput v-model="advanceSearchForm.mobile" placeholder="请输入手机号码"></FInput>
            </FFormItem>
             <FFormItem label="爱好">
                <FSelect v-model="advanceSearchForm.hobby" :options="hobbyList"
                        placeholder="请选择" clearable filterable multiple>
                </FSelect>
            </FFormItem>
            <FFormItem label="宗教信仰">
                <FRadioGroup v-model="advanceSearchForm.faith">
                        <FRadio :value="true">是</FRadio>
                        <FRadio :value="false">否</FRadio>
                </FRadioGroup>
            </FFormItem>
        </FForm>
    </FModal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { BSearch } from '@webank/bdp-design';
import { FSelect, FInput, FButton, FModal, FForm, FFormItem, FDatePicker, FRadioGroup, FRadio } from '@fesjs/fes-design';

const searchForm = ref({
    name: '',
    age: '',
    gender: '',
})
const advanceSearchForm = ref({
    mobile: '',
    hobby: [],
    faith: null,
})
const genderList = [
    {
        label: '女',
        value: 'woman'
    },
    {
        label: '男',
        value: 'man'
    }
]
const hobbyList = [
    {
        label: '篮球',
        value: 'basketball'
    },
    {
        label: '游泳',
        value: 'swim'
    },
    {
        label: '桌游',
        value: 'BRPG'
    }
]
const handleSearch = (e: any) => {
    console.log('handleSearch-查询操作', e);
}

const showAdvanceQuery = ref(false);
const toggleAdvanceQuery = () => {
    showAdvanceQuery.value = true;
};
const advanceCancel = () => {
    showAdvanceQuery.value = false;
}
const handleReset = () => {
    console.log('handleReset-重置操作，重置页码重新查询');
    
}
const handleEX = () => {
    console.log('handleEX');
};
</script>
