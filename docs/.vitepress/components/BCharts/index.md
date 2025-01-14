# BCharts
提供通用的图表组件，支持时间范围选择和数据刷新。

## 组件注册

```js
import { BCharts } from '@fesjs/traction-widget';
app.use(BCharts);
```

## 代码演示
### 基础用法
传入图表配置和数据获取方法，自动处理图表的渲染和更新。

--USE

--CODE

## 参数说明
### BCharts Props
| 属性  | 说明                   | 类型                                    |  默认值  | 是否必须 |
| ----- | ---------------------- | --------------------------------------- | -------- | -------- |
| chartId | 图表DOM的id | string | - | 是 |
| config | 图表配置项 | ChartConfig | - | 是 |
| initialDays | 初始时间范围天数 | number | 7 | 否 |

### ChartConfig 类型定义
```ts
interface BarStyle {
  color: string;
  borderColor: string;
}

interface ChartConfig {
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
  // 自定义 tooltip 格式化函数
  tooltipFormatter?: (params: any[]) => string;
}
```

## 注意事项
1. 组件会自动处理图表的初始化和销毁
2. 时间范围变化时会自动重新获取数据并更新图表
3. 支持自定义每个数据系列的样式
4. 确保提供唯一的 chartId 以避免 DOM 冲突 
5. 可以通过 tooltipFormatter 自定义提示框的显示格式 