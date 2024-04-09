# format
提供一个格式化对象，具有常见的格式化方法，分为表格格式化TABLE类和基本字符串或数字类型格式化NORMAL。

## 使用方式

```js
<template>
    <div>
         <f-table :data="tableAllLists">
                    <f-table-column prop="id" label="ID" :width="80" ellipsis />
                    <f-table-column prop="cn_name" label="中文名称" :width="160" ellipsis :formatter="format.TABLE.textValue"/>
           <f-table-column prop="en_name" label="英文名称" :width="160" ellipsis />
                    <f-table-column prop="capacity" label="数据容量（GB）" :width="160" :formatter="format.TABLE.stdNumber" ellipsis />
           <f-table-column prop="capacity2" label="数据容量2（GB）" :width="160" ellipsis />
           <f-table-column prop="ratio" label="容量占比（%）" :width="160" :formatter="format.TABLE.stdNumberFix2" ellipsis />
                    <f-table-column prop="open" label="开启" :width="160" :formatter="format.TABLE.bool2string" ellipsis />
                </f-table>
    </div>
</template>
<script setup lang="ts">
import { FTable, FTableColumn, FPagination } from '@fesjs/fes-design';
import { ref} from 'vue';
  import { format } from '@fesjs/traction-widget';

const generateData = () => {
    const data = [];
    for (let i=0; i<10; i++) {
        const obj = {
            id: String(i),
            cn_name: '中文名'+ i,
          	en_name: format.NORMAL.convertToSnakeCase('enNameShow') + i,
          	ratio: i*10+0.1,
            capacity: i*1000000,
            capacity2: format.NORMAL.formatterStdNumberByString(i*1000000,true,3),
            open: i%2,
        };
        data.push(obj);
    }
    return data
};
const tableAllLists = ref<any[]>(generateData());
</script>
```
## 具体内容
```js
export const format = {
    // 表格格式化函数
    TABLE: {
        // 将空白格式化为'--'
        textValue : ({ cellValue }: { cellValue: any }): any => {
            if (cellValue === 0) return 0;
            return cellValue || '--';
        },
        // 数字格式化函数，小数点前每3位打一个逗号
        stdNumber : ({ cellValue }: { cellValue: any }): any  => {
            if (cellValue === 0) return 0;
            if (isNaN(cellValue) || cellValue === null || cellValue === '') {
                return '--';
            }
            const num = Number(cellValue);
            const parts = num.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        },
        // 数字格式化函数，小数点前每3位打一个逗号,严格保留两位小数
        stdNumberFix2 :  ({ cellValue }: { cellValue: any }): any => {
            if (cellValue === 0) return 0.00;
            if (isNaN(cellValue) || cellValue === null || cellValue === '') {
                return '--';
            }
            const num = Number(cellValue).toFixed(2);
            const parts = num.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        },
        // 布尔量格式化函数，转是否
        bool2string:  ({ cellValue }: { cellValue: any }): any => {
            if (['', null, undefined].includes(cellValue)) {
                return '--'
            }
            return (([true, 'true', '是', '1',1].includes(cellValue)) ? '是' : '否');
        }
    },
    NORMAL: {
        // 将字符串中大写字母转为下划线加小写
        convertToSnakeCase : (str: string) => str.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`),
        // 数值标准化，可指定保留几位小数，每隔3位打逗号
        formatterStdNumberByString : (number: any, isFixed = false, fixNumber: number | undefined) => {
            let num:number = Number(number);
            if (isFixed) {
                num = Number(number).toFixed(fixNumber);
            }
            if (isNaN(num)) {
                return '--';
            }
            const parts = num.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        }
    },
};
```

## 参数说明
| 属性  | 说明                      | 类型                                    |  默认值              |
| ----- | -------------------------- | --------------------------------------- |------------------ |
| TABLE | 收纳常见的表格格式化 | `Function` |-|
| TABLE.textValue |  将空白内容格式化为'--' | `Function` |-|
| TABLE.stdNumber |  数字格式化，小数点前每3位打一个逗号 | `Function` |-|
| TABLE.stdNumberFix2 |  小数点前每3位打一个逗号,严格保留两位小数 | `Function` |-|
| TABLE.bool2string |  布尔量转是否 | `Function` |-|
| NORMAL | 常见数据类型格式化 | `Function`|-|
| NORMAL.convertToSnakeCase | 字符串中大写字母转为下划线加小写 | `Function`|-|
| NORMAL.formatterStdNumberByString | 数值标准化，可指定保留几位小数，每隔3位打逗号 | `Function`|-|