# BPageLoading
提供模块内或页面的loading显示。

## 组件注册

```js
import { BPageLoading } from '@webank/bdp-design';
app.use(BPageLoading);
```
## 代码演示
### 基础用法

- type不传或者传normal时，可用于表格或者模块内加载状态
- type参数为page时，loading图案于页面居中显示，用于整个页面加载状态

--USE

--CODE

### 不同状态的loding图

可以通过设置`actionType`设置不同状态的loading图，通过设置`loadingText`,设置loading时的文案展示，注意`loadingText`是一个对象，可以按自己需要设置某一个状态的提示语。

--ACTION



## 参数说明
### PageLoading Props

| 属性  | 说明                   | 类型                                    |  默认值                                 |
| ----- | ----------------------------- | ---------------------------------------- |------------------ |
| type | 类型，可选有'normal' 、 'page'| string|normal|
| actionType | 类型，可选有'loading' 、 'emptyInitResult' 、 'emptyQueryResult'、'noPermissions' | string|'loading'|
| loadingText | 对象，替换默认展示文案，会自动合并，不用每次替换所有的状态的展示文案| Object| `{loading: 'Loding. . .',emptyInitResult: '这里还没有数据. . .',emptyQueryResult: '没有符合条件的结果. . .',noPermissions: '暂无权限'}`|
| logout | 事件，暂无权限时点击登出按钮触发的事件| Function| () => {}|