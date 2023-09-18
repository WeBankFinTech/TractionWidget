<template>
    <BTagSelector v-model:selectedList="flavour" :options="flavourList" label="计数" tagKey="value" @selectorChange="handleChange">
         <template v-slot:header>
             <div class="title-text">选中tag计数: {{ flavour.length }}</div>
         </template>
         <template v-slot:selectors>
            <FSelect
                v-model="city"
                filterable
                :options="[{ value: 'beijing', label: '北京' }, { value: 'shanghai', label: '上海' }]"
                @change="handleCityChange"
            ></FSelect>
            <FSelect
                v-model="food"
                filterable
                clearable
                :options="foodList"
            ></FSelect>
        </template>
    </BTagSelector>
</template>
<script setup lang="ts">
import { BTagSelector } from '@fesjs/traction-widget';
import { FSelect } from '@fesjs/fes-design';
import { ref, computed } from 'vue';

// 选择器所绑定的数据
const city = ref<string>('');
const food = ref<string>('');
const flavour = ref<string[]>([]);
// 下拉框数据
const foodList = computed(() => {
    if (city.value === 'beijing') {
        return [{ value: 'bjky', label: '北京烤鸭' }, { value: 'thl', label: '糖葫芦' }];
    } else if (city.value === 'shanghai') {
        return [{ value: 'sjb', label: '生煎包' }, { value: 'bby', label: '八宝鸭' }];
    } else {
        return [];
    }
});
const flavourList = computed(() => {
    switch (food.value) {
        case 'bjky':
            return [{ value: '烤鸭我喜欢有葱丝的', label: '葱丝' }, { value: '烤鸭我喜欢有黄瓜丝的', label: '黄瓜丝' }];
        case 'thl':
            return [{ value: '糖葫芦我喜欢草莓的', label: '草莓' }, { value: '糖葫芦我喜欢山楂的', label: '山楂' }];
        case 'sjb':
            return [{ value: '生煎包我喜欢牛肉的', label: '牛肉' }, { value: '生煎包我喜欢猪肉的', label: '猪肉' }];
        case 'bby':
            return [{ value: '八宝鸭我喜欢加干贝的', label: '干贝' }, { value: '八宝鸭我喜欢加火腿的', label: '火腿' }];
        default:
            return [];
    }
});
// 选择器联动逻辑
const handleCityChange = () => {
    food.value = '';
};
// 数据变化的回调
const handleChange = (val: any) => {
    console.log(val);
};
</script>
<style scoped lang="less">
.title-text {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #0f1222;
    letter-spacing: 0;
    line-height: 32px;
    font-weight: 500;
}
</style>
