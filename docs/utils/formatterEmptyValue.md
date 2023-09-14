# formatterEmptyValue
用于表格中的函数，将空白格式化为'--'的函数

## 函数使用

```js
import { formatterEmptyValue } from '@webank/bdp-design';
import { FTable, FTableColumn } from '@fesjs/fes-design';

formatterEmptyValue(cellValue)

// FTable中使用方法如下：
<FTable :data="tableData">
    <FTableColumn :formatter="formatterEmptyValue" prop="number" :label="数字"/>
</FTable>

```

## 参数说明
| 属性  | 说明                   | 类型                                    |  默认值                                 |
| ----- | ----------------------------- | ---------------------------------------- |------------------ |
| cellValue |必填，表格单元格数据| Any|  -
