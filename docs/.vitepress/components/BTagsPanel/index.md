# BTagsPanel
用于动态编辑标签，提供传入默认值，新增标签，删除标签功能

## 组件注册

```js
import { BTagsPanel } from '@fesjs/traction-widget';
app.use(BTagsPanel);
```
## 代码演示
### 基础用法
只需传入tags用于双向绑定标签列表数据。

--USE

--CODE

### 只读模式
不允许增加新标签，也不允许删除已有标签。

--USEDISABLED

### 长度限制
支持限制单标签长度，样例设置标签最大长度为8。
--USElIMIT

### 数量限制
支持限制总标签数目。样例设置numberLimit=2，限定最多输入2个标签。

--USENUMBER


### 唯一性校验
支持不允许输入重复标签。

--USEUNIQUE

### 标签名正则校验
支持对输入标签做自定义正则校验。样例设置标签只允许输入中英文字符、数字、下划线和中划线。

--USEREGEX

## 参数说明
### TagsPanel Props

| 属性  | 说明                   | 类型                                    |  默认值                                 |
| ----- | ----------------------------- | ---------------------------------------- |------------------ |
| tags | 双向绑定的标签列表 | Array(string)|[]|
| size | 尺寸，可选值：small、middle、large | string|middle|
| effect | 主题，可选值：dark、light、plain | string|light|
| type |  类型，可选值：default、success、info、warning、danger | string|default|
| disabled | 是否不可编辑 | boolean|false|
| maxlength | 单标签最大长度 | number|25|
| regex | 是否自定义输入标签校验 | string|''|
| regexTip | 标签校验错误提示语 | string|'标签输入不符合校验规则'|
| isUnique | 标签是否不可重复添加 | boolean|false|
| numberLimit | 标签总数限制 | number| 0 (默认值为0，表示不限制。)|


## 注意事项
1. BTagsPanel不同尺寸、主题和类型的标签样式效果，可至fes design查看。 https://fes-design.mumblefe.cn/zh/components/tag.html