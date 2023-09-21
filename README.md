# 大型中台项目使用到的通用组件和工具函数

本框架基于[VUEJS 3.x](https://cn.vuejs.org/)和[fes-design](https://fes-design.mumblefe.cn/)设计，使用`ts`语法编写

具体文档请查看[traction-widget](https://www.mumblefe.cn/p/traction-widget)

## 业务开发时会遇到的问题

业务需求功能会很多相似处，如果每次都手动处理，会导致：

● 代码风格、技术栈等不统一，可阅读性、可维护性降低

● 代码冗余量高，人力浪费

所以将重复的工作做总结、提取，做公共功能集合，形成上层应用组件库Traction Widget。统一维护项目中会用到的公共组件，做到降本增效。

## Traction Widget是什么？

Traction Widget 包含UI和函数两大部分，是一个大型中台通用业务组件库。像汽车部件需要一些连接器，起到牵引的作用一样。Traction Widget 同样在业务中起到连接、牵引的作用。Traction Widget聚焦系统业务开发需求，收纳高频使用的前端通用组件及工具函数，助力实现高效、标准的业务开发迭代流程。

主要作用：

● 提效

- 收纳高频组件工具，无需反复造轮子，业务开发时，可优先在Traction Widget寻找最佳解决方案
  
● 维护性高

- 对于共性问题缺陷，可一键升级组件解决，无需逐一修改打补丁
  
- 开发者编写代码风格各异，Traction Widget提供了一套代码共识，依赖程度越高，代码风格越统一，出现问题时定位也会越高效。

## 应用领域

针对大数据前端操作UI,Traction Widget在若干项目中均有应用。如：

- 数据质量管理平台 [Qualitis](https://github.com/WeBankFinTech/Qualitis)

- 数据应用开发管理集成框架 [DataSphereStudio](https://github.com/WeBankFinTech/DataSphereStudio)

- 计算中间件 [linkis](https://github.com/apache/linkis)

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
