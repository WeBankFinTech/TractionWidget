# getUrlParams
提供一个查询字符串的获取和格式化方法，可以接收一个opts对象为参数，返回对应的字符串和格式化对象。

## 函数使用

```js
import { getUrlParams } from '@fesjs/traction-widget';
//getUrlParams(opts); 
getUrlParams(); // opts的默认值是{ type: 'param' }, 返回值是当前location.search的格式化对象：{ user: 'xx', useId: 11  }
getUrlParams({ keys: ['user'] }); // opts的默认type是'param', keys过滤location.search的格式化对象，返回值：{ user: 'xx' }
getUrlParams({ type: 'param' }); // type为'param'时，返回值是当前location.search的格式化对象：{ user: 'xx', useId: 11  }
getUrlParams({ type: 'param', keys: ['user'] }); // type为'param'时，keys过滤location.search的格式化对象，返回值：{ user: 'xx' }
getUrlParams({ type: 'str' }); // type为'str'时，返回值是当前location.search: user=xx&useId=11&name=sss
getUrlParams({ type: 'str', keys: ['user']}); // type为'str'时，返回值是keys过滤的查询字符串user=xx
```

## 参数说明
| 属性  | 说明                      | 类型                                    |  默认值              |
| ----- | -------------------------- | --------------------------------------- |------------------ |
| opts | 可选参数，配置返回结果类型和过滤返回结果。<br/> \{ <br/>type: 'str' \| 'param', //不传默认是'param' <br/>keys: array, // 用来过滤返回结果<br/>\} | object | \{ type: 'param' \} |