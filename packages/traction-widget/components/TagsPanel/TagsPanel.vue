<template>
    <div :class="prefixCls" class="wd-tags-panel">
        <FTag v-for="tag in tags" :key="tag" :closable="!disabled" @close="deleteTag(tag)" :size="size" :type="type" :effect="effect">
            <FEllipsis :content="tag" style="max-width: 240px">
            </FEllipsis>
        </FTag>
        <FInput v-if="showTagInput" ref="tagInputRef" v-model="tempTagInput" class="input-nef-tag" size="small"
            :maxlength="maxlength" :showWordLimit="showWordLimit" @keyup.enter="addNewTag" @blur="addNewTag">
        </FInput>
        <FButton v-else v-show="numberLimit === 0 || tags.length < numberLimit" :disabled="disabled" class="button-nef-tag" @click="toggleTagInput">
            <PlusOutlined />{{ tagsPanelLocalObj?.addTag }}
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
import { useLocale } from '../hooks/useLocale';
const locale = useLocale();
const tagsPanelLocalObj = locale.tagsPanel || {};

const prefixCls = getPrefixCls('TagsPanel');

const props = defineProps({
    // 标签数量限制, 默认为0表示不限制，非0则限制
    numberLimit: {
        type: Number,
        default: 0
    },
    // 标签是否不可重复
    isUnique: {
        type: Boolean,
        defalut: false
    },
    // 输入校验
    regex: {
        type: RegExp,
        default: null
    },
    // 校验错误提示
    regexTip: {
        type: String,
        default: '标签输入不符合校验规则'
    },
    // 标签最大长度
    maxlength: {
        type: Number,
        default: 25
    },
    // 是否展示输入长度
    showWordLimit: {
        type: Boolean,
        default: false
    },
    // 是否可编辑
    disabled: {
        type: Boolean,
        default: false
    },
    // 尺寸，可选值：small、middle、large
    size: {
        type: String,
        default: 'middle'
    },
    // 主题，可选值：dark、light、plain
    effect: {
        type: String,
        default: 'light'
    },
    // 类型，可选值：default、success、info、warning、danger
    type: {
        type: String,
        default: 'default'
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
            flag = props.regex.test(tempTagInput.value);
        }
        if (flag) {
            if (props.isUnique && datasource.tags.find((item: any) => item === tempTagInput.value)) {
                FMessage.warn(tagsPanelLocalObj.repeatTip);
                closeInput();
                return;
            }
            if (props.numberLimit !== 0 && datasource.tags.length >= props.numberLimit) {
                FMessage.warn(`${tagsPanelLocalObj.numberLimitTip}${props.numberLimit}${tagsPanelLocalObj.tag}!`);
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
