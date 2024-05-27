<template>
    <BSearch v-model:form="searchForm" v-model:advanceForm="advanceSearchForm" :isResetAllClear="false"
                :isAdvance='true' :isCustomAdvanceCount='true'  :advanceCountFunc="handleCustomAdvanceCount"
                @search="handleSearch" @reset="handleReset" @advance="toggleAdvanceQuery">
        <template v-slot:form>
            <div>
                <span class="condition-label">姓名</span>
                <FInput v-model="searchForm.name" placeholder="请输入">
                </FInput>
            </div>
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
import { BSearch } from '@fesjs/traction-widget';
import { FSelect, FInput, FButton, FModal, FForm, FFormItem, FDatePicker, FRadioGroup, FRadio } from '@fesjs/fes-design';
import { isBoolean } from 'lodash-es';

const searchForm = ref({
    name: '',
})
const initAdvanceSearchForm = () => ({
    mobile: '',
    hobby: [],
    faith: null,
})

const advanceSearchForm = ref(initAdvanceSearchForm())

const handleCustomAdvanceCount = (advanceFormData:any) => {
    return Object.values(advanceFormData).filter((item) => {
        if (item === 0) return true;
        if (Array.isArray(item) && item.length === 0) return false;
        return !!item;
    }).length;
};
const handleReset = () => {
    searchForm.value.name = '姓名默认值'
    advanceSearchForm.value = initAdvanceSearchForm()
    console.log('自行编写清除逻辑');
    
}

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
const handleEX = () => {
    console.log('handleEX');
};

</script>
