# BTagsPanel
用于动态编辑标签，提供传入默认值，新增标签，删除标签功能

## 组件注册

```js
import { BTagsPanel } from '@webank/bdp-design';
app.use(BTagsPanel);
```
## 代码演示
### 基础用法
只需传入tags用于双向绑定标签列表数据

--USE

--CODE

## 参数说明
### TagsPanel Props

| 属性  | 说明                   | 类型                                    |  默认值                                 |
| ----- | ----------------------------- | ---------------------------------------- |------------------ |
| tags | 双向绑定的标签列表 | Array(string)|[]|
| size | 尺寸，可选值：small、middle、large | string|middle|
| effect | 主题，可选值：dark、light、plain | string|light|
| type |  类型，可选值：default、success、info、warning、danger | string|default|

## 注意事项
1. BTagsPanel不同尺寸、主题和类型的标签样式效果，可至fes design查看。 https://fes-design.mumblefe.cn/zh/components/tag.html