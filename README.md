# Traction Widget

Traction Widget 包含UI和函数两大部分，是一个大型中台通用业务组件库，聚焦系统业务开发需求，收纳高频使用的前端通用组件及工具函数，助力实现高效、标准的业务开发迭代流程。这些组件像汽车的连接零件一样，将关联部分紧紧连接在一起，牵引起来，发挥纽带作用。

使用文档请查看[traction-widget](https://www.mumblefe.cn/p/traction-widget)

## 为什么要做Traction Widget

业务需求功能会很多相似处，如果每次都手动处理，会导致同一种功能有多个版本实现、项目之间缺乏连通性等问题，因此我们需要一个组件库去维护这些可以通用的功能，起到：

1. 提效

> 收纳高频组件工具，无需反复造轮子，业务开发时，可优先在Traction Widget寻找最佳解决方案
  
2. 维护性高

> 对于共性问题缺陷，可一键升级组件解决，无需逐一修改打补丁
  
> 开发者编写代码风格各异，Traction Widget提供了一套代码共识，依赖程度越高，代码风格越统一，出现问题时定位也会越高效。

## 应用领域

在微众银行典型的大型中台项目中，目前使用到的Traction Widget的项目有：

- 数据应用开发管理集成框架 [DataSphereStudio](https://github.com/WeBankFinTech/DataSphereStudio)

- 计算中间件 [linkis](https://github.com/apache/linkis)

- 数据质量管理平台 [Qualitis](https://github.com/WeBankFinTech/Qualitis)

将来还会有跟多的平台接入

## 框架说明

Traction Widget基于[VUEJS 3.x](https://cn.vuejs.org/)和[fes-design](https://fes-design.mumblefe.cn/)设计，使用`ts`语法编写

## 组件概览

![](https://github.com/WeBankFinTech/TractionWidget/blob/dev_monday/packages/traction-widget/components/assets/images/componentOverview.png)

## 组件使用

```html
# 安装依赖
npm i -S @fesjs/traction-widget

# 引入组件
import { table } from '@fesjs/traction-widget'
# 使用组件
<template>
  <table></table>
</template>
```
