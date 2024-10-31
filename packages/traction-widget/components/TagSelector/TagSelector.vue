<template>
    <div class="selector-wrapper">
        <div v-if="isSlotHeader" class="selector-header">
            <slot name="header"></slot>
        </div>
        <div :class="[isSlotHeader ? 'selector-with-header' : 'selector']">
            <div class="query-input">
                <slot name="selectors"></slot>
                <FSelect v-model="selectedList" class="hidden-select" filterable multiple :options="props.options" @change="handleChange" :getContainer="getContainer"></FSelect>
            </div>
            <div class="tag-label">
                <span>{{ tagSelectorLocalObj?.selected }}</span>
                <span v-if="clearable" class="clearable" @click="handleClear">{{ tagSelectorLocalObj?.clearAll }}</span>
            </div>
            <div class="tag-container">
                <FTag
                    v-for="(item, index) in selectedList"
                    :key="item"
                    type="info"
                    style="margin-right: 8px; margin-top: 8px"
                    closable
                    @close="deleteTag(item, index)"
                >
                    {{ cacheOptions.find((p) => p.value === item)[props.tagKey] }}
                </FTag>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed, useSlots, ref } from 'vue';
import { FTag, FSelect } from '@fesjs/fes-design';
import { useLocale } from '../hooks/useLocale';

const locale = useLocale();
const tagSelectorLocalObj = locale.TagSelector || {};

const props = defineProps({
    // 已选的数据列表
    selectedList: {
        type: Array,
        require: true,
        default: () => []
    },
    // 下拉框数据，用于反显
    options: {
        type: Array,
        require: true,
        default: () => []
    },
    // 自定义tag的key
    tagKey: {
        type: String,
        require: false,
        default: 'label'
    },
    clearable: {
        type: Boolean,
        require: false,
        default: false
    },
    getContainer: {
        type: Function,
        required: false,
        default: () => document.body
    }
});
const emit = defineEmits(['update:selectedList', 'selectorChange', 'clearAll']);
const selectedList = computed({
    get () {
        return props.selectedList;
    },
    set (val: any[]) {
        emit('update:selectedList', val);
    }
});
const deleteTag = (item: any, index: number) => {
    selectedList.value.splice(index, 1);
    emit('selectorChange', selectedList.value);
};
const cacheOptions = ref<any[]>([]);
const isSlotHeader = computed(() => !!useSlots().header);
const handleChange = (val: any) => {
    cacheOptions.value.push(...props.options);
    cacheOptions.value = cacheOptions.value.filter((item, index, self) => {
        return self.findIndex(el => el.value === item.value) === index;
    });
    cacheOptions.value = cacheOptions.value.filter(item => val.includes(item.value));
    emit('selectorChange', val);
};

const handleClear = () => {
    selectedList.value = [];
    emit('clearAll');
};
</script>

<script lang="ts">
export default {
    name: 'BTagSelector'
};
</script>
