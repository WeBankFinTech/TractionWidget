import { cloneDeep } from 'lodash-es';

export const dynamicFormOperate = (formRef: any[] = [], dataList: any[] = [], initItem: object): any => {
    // console.log('formRef', formRef);
    // console.log('dataList', dataList);
    // console.log('initItem', initItem);

    // 给传入的初始化数据绑id
    dataList.forEach((e, index) => {
        const timestamp = Date.now();
        if (!e.timestamp) {
            e.timestamp = timestamp - index;
        }
    });
    // 测试item中包含数组对象时的深拷贝情况
    const getInitItem = (): any => {
        const item = cloneDeep(initItem);
        return {
            timestamp: Date.now(),
            ...item
        };
    };
    const addDynamicItem = (): any => {
        dataList.push(getInitItem());
    };
    const minusDynamicItem = (data: any): any => {
        const index = dataList.findIndex(item => item.timestamp === data.timestamp);
        dataList.splice(index, 1);
    };
    const dynamicFormValid = async (): Promise<any> => {
        try {
            const formValidArray = formRef.map((item: { validate: () => any }) => item.validate());
            await Promise.all(formValidArray);
            console.log('动态表单验证成功');
            return true;
        } catch (error) {
            console.log('动态表单验证失败: ', error);
            return false;
        }
    };
    const dynamicFormClearValid = async (): Promise<any> => {
        formRef.map((item: { clearValidate: () => any }) => item.clearValidate());
    };
    const getDynamicFormData = (): any => {
        const returnDifList = cloneDeep(dataList);
        returnDifList.forEach((item) => {
            delete item.timestamp;
        });
        return returnDifList;
    };
    // 重置动态表单数据
    const resetDynamicFormData = (): any => {
        dataList.splice(0, dataList.length);
        dataList.push(getInitItem());
    };
    return {
        addDynamicItem,
        minusDynamicItem,
        dynamicFormValid,
        dynamicFormClearValid,
        getDynamicFormData,
        resetDynamicFormData
    };
};
