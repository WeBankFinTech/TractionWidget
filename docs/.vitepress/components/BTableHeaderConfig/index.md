# BTableHeaderConfig

设置表格列的显示和隐藏。

## 组件注册

```js
import { BTableHeaderConfig } from '@fesjs/traction-widget';
app.use(BTableHeaderConfig);
```

## 代码演示

### 基础用法

按格式传入需要控制的表格列字段数据，在控制面板中设置表格列的展示。

--USE

--CODE

## 参数说明

### TableHeaderConfig Props

| 属性          | 说明                                                                                                                                            | 类型                                 | 默认值 | 是否必须 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------ | -------- |
| originHeaders | 全部列                                                                                                                                          | Array(Col)                           | []     | 是       |
| headers       | 当前显示的列的数组（v-model）                                                                                                                   | Array({prop: string, label: string}) | []     | 是       |
| show          | 控制弹窗显隐（v-model）                                                                                                                         | Boolean                              | false  | 是       |
| type          | 缓存设置标识，建议每个表格都适用不同的标识<br>1、设置该属性时，设置将会被保存到当前浏览器的 localStorage<br>2、未设置该属性时，设置仅为当次有效 | String                               | ''     | 否       |

### Col Props

| 属性    | 说明                                                    | 类型    | 是否必须 |
| ------- | ------------------------------------------------------- | ------- | -------- |
| prop    | 列属性值                                                | String  | 是       |
| label   | 列标题值                                                | String  | 是       |
| hidden | 是否默认隐藏此列，用于初始化展示，优先级低于 localStorage | Boolean | 否       |

## 注意事项

1. 列的显示与否需要通过 Table 组件的 `visible` 属性来设置，TableHeaderConfig 组件会通过变量 `headers` 回写当前显示列的数据，因此 Table 组件的 `visible` 控制可以如下：

```js
const checkTColShow = (col: string) =>
  headers.value.map((item) => item.prop).includes(col);
```

2. 每个表头设置的 `type` 不能相同，否则存储到本地存储的历史配置会发生冲突，导致相同 `type` 的表头设置相互影响。
