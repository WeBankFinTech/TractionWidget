<template>
    <div class="wd-content-body">
        <h4 class="chart-title">{{ config.title }}</h4>
        <div class="date-range">
            <div class="mr16 my-date-picker">
                <FDatePicker type="daterange" v-model="dateRange" @change="updateDateRange" />
            </div>
            <FButton key="btn-1" class="mr16" :class="{ 'my-btn': true, active: days === 7 }" @click="updateDays(7)">
                最近7天
            </FButton>
            <FButton key="btn-2" :class="{ 'my-btn': true, active: days === 30 }" @click="updateDays(30)">
                最近30天
            </FButton>
        </div>
        <div :id="chartId" class="chart-container">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FDatePicker, FButton } from '@fesjs/fes-design';
import { useChart, type ChartConfig } from './useChart';
import {
    getYear, getMonth, getDate, subDays, differenceInDays,
} from 'date-fns';



interface Props {
    chartId: string;
    config: ChartConfig;
    initialDays?: number;
}

const props = defineProps<Props>();

// 日期范围相关
const days = ref(props.initialDays || 7);
const initialEndDate = new Date().getTime();
const initialStartDate = subDays(new Date(initialEndDate), days.value - 1).getTime();
const endDate = ref(initialEndDate);
const startDate = ref(initialStartDate);

// 初始化时，开始日期在前，结束日期在后
const dateRange = ref([initialStartDate, initialEndDate]);

const updateDateRange = (range: number[]) => {
    const [startStamp, endStamp] = range;
    startDate.value = startStamp;
    endDate.value = endStamp;
    const now = Date.now();
    if (startStamp && endStamp) {
        const isToday = getYear(now) === getYear(endStamp)
            && getMonth(now) === getMonth(endStamp)
            && getDate(now) === getDate(endStamp);
        const daysDiff = differenceInDays(endStamp, startStamp) + 1;
        if (isToday && [7, 30].includes(daysDiff)) {
            days.value = daysDiff;
        } else {
            days.value = 0;
        }
    }
};

const updateDays = (newDays: number) => {
    const _endDate = new Date();
    const _startDate = subDays(_endDate, newDays - 1);
    dateRange.value = [_startDate.getTime(), _endDate.getTime()];
    days.value = newDays;
    startDate.value = _startDate.getTime();
    endDate.value = _endDate.getTime();
};

// 图表相关
const { loading } = useChart(
    props.chartId,
    props.config,
    startDate,
    endDate
);
</script>
