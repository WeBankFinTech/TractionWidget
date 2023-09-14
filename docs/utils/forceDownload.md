# forceDownload
提供文件导出功能的函数，用于表格中导出表格数据的场景使用

## 函数使用

```js
import { forceDownload } from '@webank/bdp-design';

const exportFileByParams = async (datas) => {
    let blobUrl;
    try {
        const { data: blodData } = await API(datas);
        const fileName = '按需处理的文件名';
        if (!fileName.endsWith('.xlsx')) {
            fileName = `${fileName}.xlsx`;
        }
        // 通过window.URL.revokeObjectURL处理后的URL
        blobUrl = window.URL.createObjectURL(blodData);
        forceDownload(blobUrl, fileName, () => {
            window.URL.revokeObjectURL(blobUrl);
        });
    } catch (error) {
        console.error(error);
        window.URL.revokeObjectURL(blobUrl);
    }
};
```
## 参数说明
| 属性  | 说明                   | 类型                                    |  默认值                                 |
| ----- | ----------------------------- | ---------------------------------------- |------------------ |
| blobUrl |必填， blod对象通过window.URL.revokeObjectURL处理后的URL| String|-
| fileName | 必填，导出的文件名称 | String|'file.xlsx'|
| callback | 可选，回调函数| Function| -|