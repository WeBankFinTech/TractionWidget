# BTablePage

用于提供通用型表格布局

## 组件注册

```js
import { BTablePage } from '@webank/bdp-design';
app.use(BTablePage);
```

## 代码演示

### 基础用法

采用slot,在指定位置传入顶部搜索栏、表格操作按钮、表格内容和翻页组件，无需自行配置任何样式布局，即可生成标准的表格页面。

--USE

--CODE

## 参数说明

### TablePage Props

| 属性          | 说明                                                                                                                                            | 类型                                 | 默认值 | 是否必须 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------ | -------- |
| layout | 布局类型 ，可选有'table'-表格页使用，'drawer'-抽屉页使用                                                                                                                                        | String                           | table     | 否      |                      |
| isDivider | 是否有分割线                                                                                                                                         | Boolean                           | true     | 否      |                      |
| loadingText | 加载文字对象| Object| `{loading: 'Loding. . .',emptyInitResult: '这里还没有数据. . .',emptyQueryResult: '没有符合条件的结果. . .'}`| 否      |                      |
| actionType | 加载类型，可选有'loading' 、 'emptyInitResult' 、 'emptyQueryResult' | String| loading |否
| isLoading | 表格是否加载                                                                                                                                         | Boolean                           | false     | 是      |                      |
### TablePage Slots
| 名称          | 说明                                                                                                                                            | 参数                                |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| search | 顶部搜索栏                                                                                                                                          | -                        |
| operate | 表格操作栏                                                                                                                                          | -                        |
| table | 表格内容                                                                                                                                          | -                        |
| pagination | 翻页页码                                                                                                                                          | -                        |
## 注意事项
1. 案例中使用到的search组件的详细说明，请看BSearch组件页面