<template>
    <div style="background: #f6f6f7;">
        <div v-for="(data, index) in dataList" :key="index" style="padding:16px 16px 16px 16px; margin-bottom: -30px">
            <FForm
                :ref="el => { if (el) formRef[index] = el; }"
                label-width="120px"
                :model="dataList[index]"
                :labelPosition="`right`"
                :labelWidth="84"
                :rules="ruleValidate"
                layout="inline"

            >
                <FFormItem prop="type">
                    <FSelect
                        v-model="dataList[index].type"
                        filterable
                        :placeholder="'种类'"
                        :options="typeList"
                        @change="dataList[index].goods = ''"
                    >
                    </FSelect>
                </FFormItem>
                <FFormItem prop="goods" >
                    <FInput v-model="dataList[index].goods" :placeholder="`物品`" />
                </FFormItem>
                <FFormItem props="icon">
                    <MinusCircleOutlined @click="minusDynamicItem(dataList[index])" />
                </FFormItem>
            </FForm>
        </div>
        <FButton
            type="link"
            class="init-button"
            @click="addDynamicItem"
        >
            <template #icon>
                <PlusCircleOutlined />
            </template>添加
        </FButton>
    </div>
    <div style="margin: 16px">
        <FSpace>
            <FButton
                class="init-button"
                @click="dynamicFormValid"
            >
                校验表单
            </FButton>
            <FButton
                class="init-button"
                @click="dynamicFormClearValid"
            >
                清空校验表单
            </FButton>
            <FButton
                class="init-button"
                @click="resetDynamicFormData"
            >
                重置表单
            </FButton>
            <FButton
                class="init-button"
                @click="getData"
            >
                获取数据
            </FButton>
        </FSpace>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { dynamicFormOperate } from '@webank/bdp-design';
import { PlusCircleOutlined, MinusCircleOutlined } from '@fesjs/fes-design/icon';
import { FButton, FForm, FFormItem, FInput, FSelect, FSpace } from '@fesjs/fes-design';


const formRef = ref([]);
const dataList = ref([
    {
        type: 'fruit',
        goods:'西瓜',
    },
]);
const initItem = {
    type: '',
    goods: '',
};
const {
    addDynamicItem,
    minusDynamicItem,
    dynamicFormValid,
    dynamicFormClearValid,
    getDynamicFormData,
    resetDynamicFormData
} = dynamicFormOperate(formRef.value,dataList.value,initItem)

const getData = () => {
    const data = getDynamicFormData();
    console.log('表单数据：', data);
}
const ruleValidate = ref({
    type: [
        { trigger: ['change', 'blur'], required: true, message: '不能为空' },
    ],
    goods: [
        { trigger: ['change', 'blur'], required: true, message: '不能为空' },
    ],
});
const typeList = [
    {
        value: 'vegetable',
        label: '蔬菜',
    },
    {
        value: 'fruit',
        label: '水果'
    }
]
</script>