import { onMounted, onUnmounted, Ref, ref, watch, markRaw } from 'vue';
import echarts from './useEcharts';
import type { EChartsOption, TooltipComponentFormatterCallback } from 'echarts';
import { useLocale } from '../hooks/useLocale';

const locale = useLocale();
const chartsLocale = locale.Charts;

export interface BarStyle {
    color: string;
    borderColor: string;
}

export interface ChartConfig {
    // 图表标题
    title: string;
    // 数据项配置
    series: {
        field: string;
        name: string;
        itemStyle: BarStyle;
    }[];
    // 获取数据的方法，接收时间范围参数
    fetchData: (startTime: number, endTime: number) => Promise<any[]>;
    // x轴字段名
    xAxisField: string;
    // 自定义 tooltip formatter
    tooltipFormatter?: (params: any[]) => string;
}

export function useChart(
    chartId: string,
    config: ChartConfig,
    startDate: Ref<number>,
    endDate: Ref<number>
) {

    let chartInstance: echarts.ECharts | null = null;
    const loading = ref(false);

    const initChart = () => {
        const chartDom = document.getElementById(chartId);
        const instance = echarts.getInstanceByDom(chartDom as HTMLElement);
        if (instance) {
            instance.dispose();
        }
        if (chartDom) {
            chartInstance = markRaw(echarts.init(chartDom));
        }
    };

    const transformData = (data: any[]) => {
        const xAxisData = data.map(item => item[config.xAxisField]);
        // 计算每个系列的总和
        const seriesTotal = config.series.reduce((acc, series) => {
            const total = data.reduce((sum, item) => sum + (Number(item[series.field]) || 0), 0);
            acc[series.name] = total;
            return acc;
        }, {} as Record<string, number>);

        // 计算最大值来确定左侧留白
        let maxSum = 0;
        let leftGridSize = 16; // 基础留白大小

        data.forEach(item => {
            // 计算所有系列的当前数据点总和
            const currentSum = config.series.reduce((sum, series) => {
                return sum + (item[series.field] || 0);
            }, 0);
            maxSum = Math.max(maxSum, currentSum);
        });

        // 根据最大值的位数调整留白
        const maxSumLen = String(maxSum).length;
        if (maxSumLen > 0) {
            leftGridSize += (maxSumLen - 1) * 8;
        }

        const series = config.series.map(item => ({
            name: item.name,
            type: 'bar' as const,
            data: data.map(d => d[item.field]),
            itemStyle: item.itemStyle,
            emphasis: {
                focus: 'series' as const
            }
        }));
        
        return {
            xAxisData,
            series,
            leftGridSize,
            seriesTotal
        };
    };
    const genTooltipStr = (tempData: any[]) => {
        const showList = tempData.map((item: { value: any; seriesName: any; }) => ({ value: item.value, name: item.seriesName }));
        const dateStr = showList.length ? `${chartsLocale.date}${tempData[0].name} <br />` : '';
        const total = showList.reduce((pre: any, cur: { value: any; }) => pre + cur.value, 0);
        const totalStr = showList.length ? `${chartsLocale.total}${total} <br />` : '';
        const showListStr = showList.reduce((pre: any, cur: { name: any; value: any; }) => `${pre}${cur.name}: ${cur.value}<br />`, '');
        return dateStr + totalStr + showListStr;
    };
    const updateChart = async () => {
        if (!chartInstance) return;

        try {
            loading.value = true;
            const data = await config.fetchData(startDate.value, endDate.value);
            const { xAxisData, series, leftGridSize, seriesTotal } = transformData(data);

            const option: EChartsOption = {
                backgroundColor: '#fff',
                grid: {
                    top: 17,
                    right: 0,
                    left: leftGridSize,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: "shadow",
                    },
                    formatter: ((params) => {
                        const formattedParams = params as any[];
                        return config.tooltipFormatter 
                            ? config.tooltipFormatter(formattedParams)
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
                    data: config.series.map(item => ({
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

    // 监听日期变化
    watch([startDate, endDate], () => {
        updateChart();
    }, {
        immediate: true
    });

    const handleResize = () => {
        chartInstance?.resize();
    };

    onMounted(() => {
        initChart();
        updateChart();
        window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        chartInstance?.dispose();
    });

    return {
        chartInstance,
        loading,
        updateChart
    };
} 