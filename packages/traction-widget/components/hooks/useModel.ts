import { watch, reactive } from 'vue';
import { isEqual } from 'lodash-es';

type targetType = Record<string, any>;

export const useFormModel = (props: any, emit: any, config: string[] = []): any => {
    const target: targetType = {};
    config.forEach((item) => {
        target[item] = props[item];
    });
    const datasource = reactive(target);
    watch(() => datasource, () => {
        for (let i = 0; i < config.length; i++) {
            const key = config[i];
            emit(`update:${key}`, datasource[key]);
        }
    }, { deep: true });
    watch(() => props, () => {
        for (let i = 0; i < config.length; i++) {
            const key = config[i];
            if (!isEqual(props[key], datasource[key])) {
                datasource[key] = props[key];
            }
        }
    }, { deep: true });
    return {
        datasource
    };
};

export const useNewFormModel = (props: any, emit: any, config: string[] = []): any => {
    const target: targetType = {};
    config.forEach((item) => {
        target[item] = props[item];
    });
    const datasource = reactive(target);
    watch(() => datasource, () => {
        for (let i = 0; i < config.length; i++) {
            const key = config[i];
            emit(`update:${key}`, datasource[key]);
        }
    }, { deep: true });
    watch(() => props, () => {
        for (let i = 0; i < config.length; i++) {
            const key = config[i];
            if (!isEqual(props[key], datasource[key])) {
                datasource[key] = props[key];
            }
        }
    }, { deep: true });
    return datasource;
};
