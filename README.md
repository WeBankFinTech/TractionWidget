# 大数据项目使用到的通用组件和工具函数

本框架基于[VUEJS 3.x](https://cn.vuejs.org/)和[fes-design](https://fes-design.mumblefe.cn/)设计，使用`jsx`语法编写

使用[lerna](https://www.lernajs.cn)组织packages

## 组件开发

组件目前存放在`src/components`目录中，新的组件添加在此目录

1、执行`lerna bootstrap`安装依赖（本地开发时，建议全局安装`wnpm i -g lerna`）

2、运行`npm run build`

3、在`当前目录`执行`npm link`

4、在`使用项目根目录`执行`npm link @webank/bdp-design`

5、在`使用项目具体目录`按照规则引入使用，比如`import { login } from '@webank/bdp-design'`

## 文档编辑

文档使用`vuepress`生产，目录存放在`docs/.vuepress/components`，预览时执行`npm run docs:dev`

## 文件结构

```
|-docs
  |-.vuepress 文档配置
    |-components 文档源码位置
    |-scripts 生成文档的脚本
    |-theme 文档预览组件需要的一些组件
    |-client.js 客户端配置
    |-config.js基础配置
  |-components npm run docs:dev之后的生成的md文件
  |-public 存放文档需要的图片等
|-scripts 组件打包的脚本
|-src
  |-components 组件
  |-utils 函数
```
