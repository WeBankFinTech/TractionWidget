<template>
    <div class="chart-body">
        <div class="chart-header">
            <div class="title-section">
                <h4 class="chart-title">{{ config.title }}</h4>
                <div class="update-info">
                    <span class="update-time">{{ chartsLocale.lastUpdate }}{{ lastUpdateTime }}</span>
                    <ReloadOutlined class="refresh-icon" @click="handleRefresh" />
                </div>
            </div>
        </div>
        <div class="date-range">
            <div class="mr16 my-date-picker">
                <FDatePicker type="daterange" v-model="dateRange" @change="updateDateRange" />
            </div>
            <FButton key="btn-1" class="mr16" :class="{ 'my-btn': true, active: days === 7 }" @click="updateDays(7)">
                {{ chartsLocale.last7Days }}
            </FButton>
            <FButton key="btn-2" :class="{ 'my-btn': true, active: days === 30 }" @click="updateDays(30)">
                {{ chartsLocale.last30Days }}
            </FButton>
        </div>
        <div :id="chartId" class="chart-container">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FDatePicker, FButton } from '@fesjs/fes-design';
import { ReloadOutlined } from '@fesjs/fes-design/icon';
import { useChart, type ChartConfig } from './useChart';
import {
    getYear, getMonth, getDate, subDays, differenceInDays,
    format,
} from 'date-fns';
import { useLocale } from '../hooks/useLocale';

const locale = useLocale();
const chartsLocale = locale.Charts;
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
const { loading, updateChart } = useChart(
    props.chartId,
    props.config,
    startDate,
    endDate
);

const lastUpdateTime = ref(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));

const handleRefresh = async () => {
    await updateChart();
    lastUpdateTime.value = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
};
</script>

<script lang="ts">
export default {
    name: 'BCharts'
};
</script>