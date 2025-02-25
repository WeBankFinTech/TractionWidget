<template>
    <div :class="prefixCls" class="wd-search">
        <div :class="{
                'condition-item': true,
                'flex-condition-item': props.isLetgo,
                'gap-22': props.isLetgo
            }">
            <FSpace :size="22" v-if="!props.isLetgo">
                <slot name="form"></slot>
            </FSpace>
            <slot name="form" v-else></slot>
        </div>
        <div :class="{
                'condition-item': true,
                'flex-condition-item': props.isLetgo,
                'gap-16': props.isLetgo
            }">
            <FSpace :size="16" v-if="!props.isLetgo">
                <FButton type="primary" @click="handleSearch">{{searchLocalObj?.search}}</FButton>
                <template v-if="props.isAdvance">
                    <FButton v-if="isAdvanceCount" @click="handleAdvance"
                            :class="querySelectedCount > 0 ? 'selected-count' : ''">
                            {{querySelectedCountText()}}
                    </FButton>
                    <FButton v-else @click="handleAdvance">
                        {{searchLocalObj?.advance}}
                    </FButton>
                </template>
                <FButton v-if="props.isReset" @click="handleReset">{{searchLocalObj?.reset}}</FButton>
                <slot name="exButton"></slot>
            </FSpace>
            <template v-else>
                <FButton type="primary" @click="handleSearch">{{searchLocalObj?.search}}</FButton>
                <template v-if="props.isAdvance">
                    <FButton v-if="isAdvanceCount" @click="handleAdvance"
                            :class="querySelectedCount > 0 ? 'selected-count' : ''">
                            {{querySelectedCountText()}}
                    </FButton>
                    <FButton v-else @click="handleAdvance">
                        {{searchLocalObj?.advance}}
                    </FButton>
                </template>
                <FButton v-if="props.isReset" @click="handleReset">{{searchLocalObj?.reset}}</FButton>
                <slot name="exButton"></slot>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { FSpace, FButton } from '@fesjs/fes-design';
import getPrefixCls from '../_util/getPrefixCls';
import { defineProps, defineEmits, computed } from 'vue';
import { useFormModel } from '../hooks/useModel';
import { isBoolean, isArray, isObject } from 'lodash-es';
import { useLocale } from '../hooks/useLocale';
const locale = useLocale();
const searchLocalObj = locale.SearchData || {};

const props = defineProps({
    // 查询表单
    form: {
        type: Object,
        require: true,
        default: () => {}
    },
    // 是否有高级筛选
    isAdvance: {
        type: Boolean,
        require: false,
        default: false
    },
    // 是否统计高级筛选数量
    isAdvanceCount: {
        type: Boolean,
        require: false,
        default: true
    },
    // 是否自定义高级筛选统计数量方法
    isCustomAdvanceCount: {
        type: Boolean,
        require: false,
        default: false
    },
    // 自定义的高级筛选函数
    advanceCountFunc: {
        type: Function,
        require: false,
        default: () => {}
    },
    // 高级筛选表单，仅用于统计填写数量
    advanceForm: {
        type: Object,
        require: false,
        default: () => {}
    },
    // 是否有重置
    isReset: {
        type: Boolean,
        require: false,
        default: true
    },
    // 点击重置后是否做清空,默认会做清空，但有时会重置为默认值，所以提供跳过清空逻辑
    isResetAllClear: {
        type: Boolean,
        require: false,
        default: true
    },
    // 是否为letgo开发。letgo不支持FSpace嵌入slot
    isLetgo: {
        type: Boolean,
        require: false,
        default: false
    }
});
const emit = defineEmits(['search', 'reset', 'advance', 'update:form', 'update:advanceForm']);
const { datasource } = useFormModel(props, emit, ['form', 'advanceForm']);

const prefixCls = getPrefixCls('search');
// 筛选条件数量的watch
const querySelectedCount = computed(() => {
    if (!props.isCustomAdvanceCount) {
        return Object.values(props.advanceForm).filter((item) => {
            if (item === 0) return true;
            if (isBoolean(item)) return true;
            if (Array.isArray(item) && item.length === 0) return false;
            return !!item;
        }).length;
    } else {
        return props.advanceCountFunc(props.advanceForm);
    }
});
const querySelectedCountText = () => {
    const str = searchLocalObj?.advance;
    if (querySelectedCount.value === 0) return str;
    if (querySelectedCount.value === 1) return `${str}(${searchLocalObj?.selected}${querySelectedCount.value}${searchLocalObj?.item})`;
    if (querySelectedCount.value > 1) return `${str}(${searchLocalObj?.selected}${querySelectedCount.value}${searchLocalObj?.items})`;
};
const handleSearch = () => {
    emit('search', datasource.form);
};
const resetForm = (form) => {
    Object.keys(form).forEach((item) => {
        if (isBoolean(form[item])) {
            form[item] = null;
        } else if (isArray(form[item])) {
            form[item] = [];
        } else if (isObject(form[item])) {
            form[item] = {};
        } else {
            form[item] = '';
        }
    });
};

const handleReset = () => {
    if (props.isResetAllClear) {
        resetForm(datasource.form);
        if (datasource.advanceForm) {
            resetForm(datasource.advanceForm);
        }
    }
    emit('reset');
};

const handleAdvance = () => {
    emit('advance');
};
</script>

<script lang="ts">
export default {
    name: 'BSearch'
};
</script>
