<template>
    <div :class="prefixCls" class="wd-tags-panel">
        <FTag v-for="tag in tags" :key="tag" :closable="!disabled" @close="deleteTag(tag)" :size="size" :type="type" :effect="effect">
            <FEllipsis :content="tag" style="max-width: 240px">
            </FEllipsis>
        </FTag>
        <FInput v-if="showTagInput" ref="tagInputRef" v-model="tempTagInput" class="input-nef-tag" size="small"
            :maxlength="maxlength" :showWorldLimit="showWordLimit" @keyup.enter="addNewTag" @blur="addNewTag">
        </FInput>
        <FButton v-else v-show="numberLimit === 0 || tags.length < numberLimit" :disabled="disabled" class="button-nef-tag" @click="toggleTagInput">
            <PlusOutlined />添加标签
        </FButton>
    </div>
</template>
<script setup lang="ts">
import { FTag, FInput, FButton, FEllipsis, FMessage } from '@fesjs/fes-design';
import {
    ref, nextTick, getCurrentInstance, PropType
} from 'vue';
import getPrefixCls from '../_util/getPrefixCls';
import { useFormModel } from '../hooks/useModel';
import { PlusOutlined } from '@fesjs/fes-design/icon';

const prefixCls = getPrefixCls('TagsPanel');

const props = defineProps({
    // 标签数量限制, 默认为0表示不限制，非0则限制
    numberLimit: {
        type: Number,
        default: 0,
    },
    // 标签是否不可重复
    isUnique: {
        type: Boolean,
        defalut: false,
    },
    // 输入校验
    regex: {
        type: String,
        default: '',
    },
    // 校验错误提示
    regexTip: {
        type: String,
        default: '标签输入不符合校验规则'
    },
    // 标签最大长度
    maxlength: {
        type: Number,
        default: 25,
    },
    // 是否展示输入长度
    showWordLimit: {
        type: Boolean,
        defalut: false,
    },
    // 是否可编辑
    disabled: {
        type: Boolean,
        default: false,
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
    // 双向绑定的标签数据
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
const notNull = (value: string) => {
    if (!value) {
        return false;
    }
    if (value.replace(/ /g, '') === '') {
        return false;
    }
    return true;
};
const closeInput = () => {
    showTagInput.value = false;
    tempTagInput.value = '';
};
const addNewTag = () => {
    if (notNull(tempTagInput.value)) {
        let flag = true;
        if (props.regex) {
            const regex = new RegExp(props.regex);
            flag = regex.test(tempTagInput.value)
        }
        if( flag) {
            if ( props.isUnique && datasource.tags.find((item: any) => item === tempTagInput.value)) {
                FMessage.warn('不能添加重复标签！');
                closeInput();
                return;
            }
            if (props.numberLimit!== 0 && datasource.tags.length >= props.numberLimit) {
                FMessage.warn(`不能添加超过${props.numberLimit}标签!`);
                closeInput();
                return;
            }
            if (datasource.tags) {
                datasource.tags.push(tempTagInput.value);
            } else {
                datasource.tags = [tempTagInput.value];
            }
        } else {
            FMessage.warning(props.regexTip);
        }
    }
    closeInput();
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
