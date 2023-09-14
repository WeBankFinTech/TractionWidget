# isIE
提供一个查询用户当前浏览器是否为IE浏览器，并提示用户使用chrome浏览器的函数

## 函数使用

```js
import { isIE } from '@webank/bdp-design';

isIE();
// 如果当前浏览器为IE浏览器，alert弹窗提示"请使用Chrome或其他高级浏览器，IE可能会无法正常显示",并返回true
// 如果当前浏览器不为IE浏览器，返回false
```