# BDynamicForms
动态表单，可增减表单项、校验表单和获取表单数据

## 组件注册

```js
import { dynamicFormOperate } from '@webank/bdp-design';
const formRef = ref([]);
const dataList = ref([
    {
        type: 'fruit',
        goods:'西瓜',
    },
]);
const initItem = {
    type: '',
    goods: '',
};
const {
    addDynamicItem,
    minusDynamicItem,
    dynamicFormValid,
    dynamicFormClearValid,
    getDynamicFormData
} = dynamicFormOperate(formRef.value,dataList.value,initItem)
```
## 代码演示
### 基础用法
动态表单函数使用范例

--USE

--CODE

## 参数说明
### 入参
| 属性  | 说明                      | 类型                                    |  默认值              |
| ----- | -------------------------- | --------------------------------------- |------------------ |
| formRef | 必填，动态表单Ref | Array | [] |
| dataList | 必填，动态表单数据 | Array | [] |
| initItem | 必填，新增表单项时的默认数据 | Object | {} |
### 返回方法
| 方法名  | 说明                      | 传参                                    | 返回值                                    |
| ----- | -------------------------- | --------------------------------------- | --------------------------------------- 
| addDynamicItem | 新增表单项 | - | - |
| minusDynamicItem | 删除表单项 | 当前删除数据-Object | - |
| dynamicFormValid | 校验表单 | - | 校验结果-Boolean |
| dynamicFormClearValid | 清除表单校验 | - | - |
| getDynamicFormData | 获得表单数据 | - | 表单数据-Array |
| resetDynamicFormData | 重置表单数据 | - | - |