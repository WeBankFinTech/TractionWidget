// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import * as charts from 'echarts/charts';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import * as renderers from 'echarts/renderers';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import * as components from 'echarts/components';

const { BarChart } = charts;
const { CanvasRenderer } = renderers;
const { TooltipComponent, GridComponent, DataZoomComponent, LegendComponent } = components;
// 注册必须的组件
echarts.use([
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer
]);

export default echarts;