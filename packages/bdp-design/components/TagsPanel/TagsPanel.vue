<template>
    <div :class="prefixCls" class="wd-tags-panel">
        <FTag v-for="tag in tags" :key="tag" closable @close="deleteTag(tag)" :size="size" :type="type" :effect="effect">
            <FEllipsis :content="tag" style="max-width: 240px">
            </FEllipsis>
        </FTag>
        <FInput v-if="showTagInput" ref="tagInputRef" v-model="tempTagInput" class="input-nef-tag" size="small"
            :maxlength="25" @keyup.enter="addNewTag" @blur="addNewTag">
        </FInput>
        <FButton v-else class="button-nef-tag" @click="toggleTagInput">
            <PlusOutlined />添加标签
        </FButton>
    </div>
</template>
<script setup lang="ts">
import { FTag, FInput, FButton, FEllipsis } from '@fesjs/fes-design';
import {
    ref, nextTick, getCurrentInstance, PropType
} from 'vue';
import getPrefixCls from '../_util/getPrefixCls';
import { useFormModel } from '../hooks/useModel';
import { PlusOutlined } from '@fesjs/fes-design/icon';

const prefixCls = getPrefixCls('TagsPanel');

const props = defineProps({
    class: {
        type: String,
        default: ''
    },
    // 尺寸，可选值：small、middle、large
    size: {
        type: String,
        default: 'middle',
        reuqire: false
    },
    // 主题，可选值：dark、light、plain
    effect: {
        type: String,
        default: 'light',
        reuqire: false
    },
    // 类型，可选值：default、success、info、warning、danger
    type: {
        type: String,
        default: 'default',
        reuqire: false
    },
    tags: {
        type: Array as PropType<Array<string>>,
        default: () => []
    }
});

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:tags']);
const { datasource } = useFormModel(props, emit, ['tags']);

const showTagInput = ref<boolean>(false);

const tempTagInput = ref<string>('');
const currentInstance = getCurrentInstance();
const deleteTag = async (tag: string) => {
    const index = datasource.tags.indexOf(tag);
    datasource.tags.splice(index, 1);
    console.log(datasource.tags);
    await currentInstance?.proxy?.$forceUpdate();
};

const addNewTag = () => {
    if (tempTagInput.value) {
        if (datasource.tags) {
            datasource.tags.push(tempTagInput.value);
        } else {
            datasource.tags = [tempTagInput.value];
        }
    }
    showTagInput.value = false;
    tempTagInput.value = '';
};

const tagInputRef = ref<InstanceType<typeof FInput>>(null as any);

const toggleTagInput = async () => {
    showTagInput.value = true;
    await nextTick();
    tagInputRef.value.focus();
};
</script>

<script lang="ts">
export default {
    name: 'BTagsPanel'
};
</script>
