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
import { ref, onMounted, onUnmounted, watch, markRaw } from 'vue';
import { FDatePicker, FButton } from '@fesjs/fes-design';
import { ReloadOutlined } from '@fesjs/fes-design/icon';
import type { EChartsOption, TooltipComponentFormatterCallback, BarSeriesOption } from 'echarts';
import echarts from './useEcharts';
import {
    getYear, getMonth, getDate, subDays, differenceInDays,
    format,
} from 'date-fns';
import { useLocale } from '../hooks/useLocale';

const locale = useLocale();
const chartsLocale = locale.Charts;

interface BarStyle {
    color: string;
    borderColor: string;
}

interface ChartConfig {
    title: string;
    series: (Pick<BarSeriesOption, Exclude<keyof BarSeriesOption, 'type' | 'name' | 'data' | 'itemStyle'>> & {
        field: string;
        name: string;
        itemStyle: BarStyle;
    })[];
    fetchData: (startTime: number, endTime: number) => Promise<any[]>;
    xAxisField: string;
    tooltipFormatter?: (params: any[]) => string;
}

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

// 图表相关逻辑
let chartInstance: echarts.ECharts | null = null;
const loading = ref(false);

const initChart = () => {
    const chartDom = document.getElementById(props.chartId);
    const instance = echarts.getInstanceByDom(chartDom as HTMLElement);
    if (instance) {
        instance.dispose();
    }
    if (chartDom) {
        chartInstance = markRaw(echarts.init(chartDom));
    }
};

const transformData = (data: any[]) => {
    const xAxisData = data.map(item => item[props.config.xAxisField]);
    // 计算每个系列的总和
    const seriesTotal = props.config.series.reduce((acc, series) => {
        const total = data.reduce((sum, item) => sum + (Number(item[series.field]) || 0), 0);
        acc[series.name] = total;
        return acc;
    }, {} as Record<string, number>);

    // 计算最大值来确定左侧留白
    let maxSum = 0;
    let leftGridSize = 16; // 基础留白大小

    data.forEach(item => {
        // 计算所有系列的当前数据点总和
        const currentSum = props.config.series.reduce((sum, series) => {
            return sum + (item[series.field] || 0);
        }, 0);
        maxSum = Math.max(maxSum, currentSum);
    });

    // 根据最大值的位数调整留白
    const maxSumLen = String(maxSum).length;
    if (maxSumLen > 0) {
        leftGridSize += (maxSumLen - 1) * 8;
    }

    const series = props.config.series.map(item => ({
        name: item.name,
        type: 'bar' as const,
        data: data.map(d => d[item.field]),
        itemStyle: item.itemStyle,
        emphasis: {
            focus: 'series' as const
        },
        ...Object.entries(item)
            .filter(([key]) => !['field', 'name', 'itemStyle'].includes(key))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    }));
    
    return {
        xAxisData,
        series,
        leftGridSize,
        seriesTotal
    };
};

const genTooltipStr = (tempData: any[]) => {
    const showList = tempData.map((item: { value: any; seriesName: any; }) => ({ 
        value: item.value, 
        name: item.seriesName 
    }));
    const dateStr = showList.length ? `${chartsLocale.date}${tempData[0].name} <br />` : '';
    const total = showList.reduce((pre: any, cur: { value: any; }) => pre + cur.value, 0);
    const totalStr = showList.length ? `${chartsLocale.total}${total} <br />` : '';
    const showListStr = showList.reduce((pre: any, cur: { name: any; value: any; }) => 
        `${pre}${cur.name}: ${cur.value}<br />`, '');
    return dateStr + totalStr + showListStr;
};

const updateChart = async () => {
    if (!chartInstance) return;

    try {
        loading.value = true;
        const data = await props.config.fetchData(startDate.value, endDate.value);
        const { xAxisData, series, leftGridSize, seriesTotal } = transformData(data);

        const option: EChartsOption = {
            backgroundColor: '#fff',
            grid: {
                top: 17,
                right: 0,
                left: leftGridSize,
                bottom: 95,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: "shadow",
                },
                formatter: ((params) => {
                    const formattedParams = params as any[];
                    return props.config.tooltipFormatter 
                        ? props.config.tooltipFormatter(formattedParams)
                        : genTooltipStr(formattedParams);
                }) as TooltipComponentFormatterCallback<any>
            },
            dataZoom: {
                type: 'slider',
                startValue: 0,
                endValue: 6,
                xAxisIndex: [0],
                handleSize: 0,
                height: 5,
                bottom: 70,
                borderColor: 'transparent',
                fillerColor: 'transparent',
                backgroundColor: 'transparent',
                showDataShadow: false,
                showDetail: false,
                realtime: true,
                filterMode: 'filter'
            },
            legend: {
                bottom: 0,
                icon: 'rect',
                height: 20,
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 32,
                itemStyle: {
                    borderWidth: 1
                },
                formatter: (name) => {
                    return `${name}(${seriesTotal[name]})`;
                },
                data: props.config.series.map(item => ({
                    name: item.name,
                    itemStyle: item.itemStyle
                }))
            },
            xAxis: [{
                type: 'category',
                axisTick: { show: false },
                axisLine: { show: false },
                data: xAxisData
            }],
            yAxis: [{
                type: 'value',
                splitLine: {
                    lineStyle: {
                        width: 1,
                        color: '#F1F1F2'
                    }
                }
            }],
            series
        };

        chartInstance.setOption(option);
    } finally {
        loading.value = false;
    }
};

const handleResize = () => {
    chartInstance?.resize();
};

// 监听日期变化
watch([startDate, endDate], () => {
    updateChart();
}, {
    immediate: true
});

onMounted(() => {
    initChart();
    updateChart();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    chartInstance?.dispose();
});

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