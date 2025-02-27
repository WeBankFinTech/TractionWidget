<template>
    <div :class="prefixCls">
       <FModal
        :show="show"
        :top="50"
        :width="600"
        :maskClosable="false"
        :getContainer="getContainer"
        :okText="tableHeaderConfigLocalObj?.confirm"
        :cancelText="tableHeaderConfigLocalObj?.cancel"
        @ok="updateHeaders"
        @cancel="reductionHeaders"
        @update:show="$emit('update:show', $event)"
        >
          <template #title>
            <span>{{ tableHeaderConfigLocalObj?.title }}</span>
            <span class="title-desc">({{ tableHeaderConfigLocalObj?.titleDesc }})</span>
        </template>
        <div class="table-header-config">
            <div class="content">
                <ul class="section-list">
                    <li v-if="activatedHeadersLocal && activatedHeadersLocal.length > 0" class="section-item">
                        <h3 class="sub-title">{{ tableHeaderConfigLocalObj?.selectedFields }}</h3>
                        <ul class="header-list">
                            <li
                                v-for="header in activatedHeadersLocal"
                                :key="header.prop"
                                class="header-item">
                                <FTag closable type="info" @close="removeActivatedField(header)">{{header.label}}</FTag>
                            </li>
                        </ul>
                    </li>
                    <li v-if="inactivatedHeadersLocal && inactivatedHeadersLocal.length > 0" class="section-item">
                        <h3 class="sub-title">{{tableHeaderConfigLocalObj?.optionalFields}}</h3>
                        <ul class="header-list">
                            <li
                                v-for="header in inactivatedHeadersLocal"
                                :key="header.prop"
                                class="header-item">
                                <FTag type="info" style="cursor: pointer;" @click="removeInactivatedField(header)">{{header.label}}</FTag>
                            </li>
                        </ul>
                    </li>
                    <li v-if="inactivatedHeadersLocal && inactivatedHeadersLocal.length === 0" class="section-item">
                        <h3 class="sub-title">{{tableHeaderConfigLocalObj?.optionalFields}}</h3>
                        <div class="hint">{{tableHeaderConfigLocalObj?.noOptionalFields}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </FModal>
    </div>

</template>
<script setup lang="ts">
import { FModal, FTag } from '@fesjs/fes-design';
import {
    onMounted, ref, PropType, VNode, VNodeChild
} from 'vue';
import getPrefixCls from '../_util/getPrefixCls';
import { cloneDeep } from 'lodash-es';
import { useLocale } from '../hooks/useLocale';
const locale = useLocale();
const tableHeaderConfigLocalObj = locale.TableHeaderConfig || {};

export interface ColItem {
    prop: string,
    label: string,
    hidden?: boolean,
};
export interface ModalConfig {
    closable?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    title?: string | VNode | (() => VNodeChild);
    content?: string | VNode | (() => VNodeChild);
    footer?: VNode | (() => VNodeChild);
    okText?: string;
    cancelText?: string;
    onOk?: (event: MouseEvent) => void | Promise<any>;
    onCancel?: (event: MouseEvent) => void | Promise<any>;
    width?: string | number;
    center?: boolean;
    getContainer?: () => HTMLElement;
}
export interface ColItemWithIndex extends ColItem {
    index: number,
}
type Cols = Array<ColItem>;
type ColsWithIndex = Array<ColItemWithIndex>;
const prefixCls = getPrefixCls('tableHeaderConfig');
const props = defineProps({
    originHeaders: {
        type: Array as PropType<Cols>,
        required: true,
        default: () => []
    },
    headers: {
        type: Array as PropType<ColsWithIndex>,
        required: true,
        default: () => []
    },
    show: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        required: false,
        default: ''
    },
    getContainer: {
        type: Function,
        required: false,
        default: () => document.body
    }
});
const emit = defineEmits(['update:headers', 'update:show']);
// 实际展示的列
const tableHeaders = ref<ColsWithIndex>([]);
// 全部列
const originTableHeaders = ref<ColsWithIndex>([]);
originTableHeaders.value = cloneDeep(props.originHeaders.map((col:ColItem, index:number) => {
    return {
        prop: col.prop,
        label: col.label,
        hidden: (col?.hidden) ?? false,
        index
    };
}));
try {
    if (props.originHeaders.length === 0) {
        console.warn('表头数据不完整');
    }
    // 从缓存中读取配置
    if (props?.type ?? false) {
        const cacheConfig = localStorage.getItem(`${props.type}_table_config`);
        if (cacheConfig != null) {
            console.log('存在表格配置的缓存信息: ', cacheConfig);
            const cachedProps = JSON.parse(cacheConfig).active;
            // 使用缓存的prop去匹配用户传入的完整配置
            tableHeaders.value = cachedProps.map(cached => {
                const matchedHeader = originTableHeaders.value.find(header => header.prop === cached.prop);
                return matchedHeader || cached; // 如果找不到匹配项，使用缓存数据作为后备
            });
        } else {
            for (let i = 0; i < originTableHeaders.value.length; i++) {
                if (!(originTableHeaders.value[i].hidden ?? false)) {
                    tableHeaders.value.push(originTableHeaders.value[i]);
                }
            }
        }
    } else {
        console.log('传入的标示key为空或者还没有设置过表头');
        for (let i = 0; i < originTableHeaders.value.length; i++) {
            if (!(originTableHeaders.value[i].hidden ?? false)) {
                tableHeaders.value.push(originTableHeaders.value[i]);
            }
        }
    }
    const emitCols:Array<{
        prop: string,
        label: string,
    }> = [];
    for (let i = 0; i < tableHeaders.value.length; i++) {
        emitCols.push({
            label: tableHeaders.value[i].label,
            prop: tableHeaders.value[i].prop
        });
    }
    emit('update:headers', emitCols);
} catch (err) {
    console.warn(err);
}
const ACTIVES = tableHeaders.value.map((item) => {
    const target = originTableHeaders.value.find((subItem) => {
        return subItem.prop === item.prop;
    });
    if (target) {
        return Object.assign({}, item, {
            index: target.index
        });
    }
    return item;
});

// 过滤数据
const IN_ACTIVES = originTableHeaders.value.filter((item) => {
    let shouldReturn = true;
    for (let i = 0; i < tableHeaders.value.length; i++) {
        const col = tableHeaders.value[i];
        if (item.prop === col.prop) {
            shouldReturn = false;
            break;
        }
    }
    return shouldReturn;
});
const activatedHeadersLocal = ref(cloneDeep(ACTIVES));
const inactivatedHeadersLocal = ref(cloneDeep(IN_ACTIVES));
const sortHeaders = (headers:ColsWithIndex) => headers.sort((a, b) => a.index - b.index);
const doSort = () => {
    activatedHeadersLocal.value = sortHeaders(activatedHeadersLocal.value);
    inactivatedHeadersLocal.value = sortHeaders(inactivatedHeadersLocal.value);
};
const removeActivatedField = (header:ColItemWithIndex) => {
    activatedHeadersLocal.value = activatedHeadersLocal.value.filter(item => item.prop !== header.prop);
    inactivatedHeadersLocal.value = [
        ...inactivatedHeadersLocal.value,
        header
    ];
    doSort();
};
const removeInactivatedField = (header:ColItemWithIndex) => {
    inactivatedHeadersLocal.value = inactivatedHeadersLocal.value.filter(item => item.prop !== header.prop);
    // 这里不能用push，push会导致父组件的 projectActivatedHeaders数组也更新了
    // activatedHeadersLocal.value.push(header);
    activatedHeadersLocal.value = [
        ...activatedHeadersLocal.value,
        header
    ];
    doSort();
};
const checkHeaders = (headers:Cols) => Array.from(new Set(headers.map(item => item.prop))).length === headers.length;

const updateHeaders = () => {
    const emitCols:Array<{
        prop: string,
        label: string,
    }> = [];
    for (let i = 0; i < activatedHeadersLocal.value.length; i++) {
        emitCols.push({
            label: activatedHeadersLocal.value[i].label,
            prop: activatedHeadersLocal.value[i].prop
        });
    }
    tableHeaders.value = cloneDeep(activatedHeadersLocal.value);
    emit('update:headers', emitCols);
    emit('update:show', false);
    // 设置缓存
    if (props.type) {
        localStorage.setItem(`${props.type}_table_config`, JSON.stringify({
            active: activatedHeadersLocal.value,
            inActive: inactivatedHeadersLocal.value
        }));
    }
};
const reductionHeaders = () => {
    activatedHeadersLocal.value = tableHeaders.value.map((item) => {
        const target = originTableHeaders.value.find((subItem) => {
            return subItem.prop === item.prop;
        });
        if (target) {
            return Object.assign({}, item, {
                index: target.index
            });
        }
        return item;
    });
    inactivatedHeadersLocal.value = originTableHeaders.value.filter((item) => {
        let shouldReturn = true;
        for (let i = 0; i < tableHeaders.value.length; i++) {
            const col = tableHeaders.value[i];
            if (item.prop === col.prop) {
                shouldReturn = false;
                break;
            }
        }
        return shouldReturn;
    });
};

onMounted(() => {
    if (!checkHeaders(props.headers)) {
        console.warn('[TableHeaderConfig.vue]: 存在prop属性重复的header！');
    }
    doSort();
});
</script>

<script lang="ts">
export default {
    name: 'BTableHeaderConfig'
};
</script>
