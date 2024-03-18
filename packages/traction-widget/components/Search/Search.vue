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
                <FButton type="primary" @click="handleSearch">查询</FButton>
                <template v-if="props.isAdvance">
                    <FButton v-if="isAdvanceCount" @click="handleAdvance"
                            :class="querySelectedCount > 0 ? 'selected-count' : ''">
                            高级筛选{{querySelectedCount > 0 ? `（已选${querySelectedCount}项）` : ''}}
                    </FButton>
                    <FButton v-else @click="handleAdvance">
                        高级筛选
                    </FButton>
                </template>
                <FButton v-if="props.isReset" @click="handleReset">重置</FButton>
                <slot name="exButton"></slot>
            </FSpace>
            <template v-else>
                <FButton type="primary" @click="handleSearch">查询</FButton>
                <template v-if="props.isAdvance">
                    <FButton v-if="isAdvanceCount" @click="handleAdvance"
                            :class="querySelectedCount > 0 ? 'selected-count' : ''">
                            高级筛选{{querySelectedCount > 0 ? `（已选${querySelectedCount}项）` : ''}}
                    </FButton>
                    <FButton v-else @click="handleAdvance">
                        高级筛选
                    </FButton>
                </template>
                <FButton v-if="props.isReset" @click="handleReset">重置</FButton>
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
    return Object.values(props.advanceForm).filter((item) => {
        if (item === 0) return true;
        if (isBoolean(item)) return true;
        if (Array.isArray(item) && item.length === 0) return false;
        return !!item;
    }).length;
});

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
    resetForm(datasource.form);
    if (datasource.advanceForm) {
        resetForm(datasource.advanceForm);
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
