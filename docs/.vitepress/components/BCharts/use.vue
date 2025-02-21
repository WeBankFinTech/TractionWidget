<template>
    <div class="chart-demo">
        <BCharts
            chart-id="demo-chart"
            :config="chartConfig"
            :initial-days="7"
        />
    </div>
</template>

<script setup lang="ts">
import { BCharts } from '@fesjs/traction-widget';

const chartConfig = {
    title: '告警统计分析',
    series: [
        {
            field: 'critical',
            name: '严重告警',
            itemStyle: {
                color: '#FEEEEE',
                borderColor: '#FF4D4F'
            },
        },
        {
            field: 'major',
            name: '主要告警',
            itemStyle: {
                color: '#EDF2FF', 
                borderColor: '#5384FF'
            }
        },
        {
            field: 'minor',
            name: '次要告警',
            itemStyle: {
                color: '#FFF4EB',
                borderColor: '#FF9900'
            }
        },
        {
            field: 'warning',
            name: '警告',
            itemStyle: {
                color: '#FFF3DC',
                borderColor: '#FAC017'
            }
        },
        {
            field: 'info',
            name: '信息',
            itemStyle: {
                color: '#D1F4E9',
                borderColor: '#00CB91'
            }
        }
    ],
    xAxisField: 'date',
    fetchData: async (startTime: number, endTime: number) => {
        // 模拟异步数据获取
        return new Promise((resolve) => {
            setTimeout(() => {
                // 生成模拟数据
                const days = Math.floor((endTime - startTime) / (24 * 60 * 60 * 1000));
                const data = [];
                
                for (let i = 0; i <= days; i++) {
                    const date = new Date(startTime + i * 24 * 60 * 60 * 1000);
                    data.push({
                        date: date.toISOString().split('T')[0],
                        critical: Math.floor(Math.random() * 10),
                        major: Math.floor(Math.random() * 15),
                        minor: Math.floor(Math.random() * 20),
                        warning: Math.floor(Math.random() * 25),
                        info: Math.floor(Math.random() * 30)
                    });
                }
                
                resolve(data);
            }, 1000);
        });
    }
};
</script>

<style scoped>
.chart-demo {
    padding: 24px;
    background: #fff;
    border-radius: 4px;
    min-height: 500px;
}
</style> 