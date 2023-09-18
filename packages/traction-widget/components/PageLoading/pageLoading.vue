<template>
    <div v-if="type ==='page'" class="page-loading">
        <div class="loading-block page" :class="actionType">
            <div class="tip">
                <div class="tip-text">{{ tip }}</div>
                <div class="tip-button">
                    <FButton v-if="actionType === 'noPermissions'" type="default" @click="logout">退出登录</FButton>
                </div>
            </div>
        </div>
    </div>
    <div v-if="type === 'normal'"  class="loading-block normal" :class="actionType">
            <div class="tip">
                <div class="tip-text">{{ tip }}</div>
                <div class="tip-button">
                    <FButton v-if="actionType === 'noPermissions'" type="default" @click="logout">退出登录</FButton>
                </div>
            </div>

    </div>
</template>

<script setup lang="ts">
import { computed, PropType, defineEmits } from 'vue';
import { FButton } from '@fesjs/fes-design';
const props = defineProps({
    type: {
        type: String,
        default: 'normal'
    },
    actionType: {
        type: String as PropType<'loading' | 'emptyInitResult' | 'emptyQueryResult' | 'noPermissions'>,
        default: 'loading'
    },
    loadingText: {
        type: Object as PropType<{
            loading?: string,
            emptyInitResult?: string,
            emptyQueryResult?: string
        }>,
        default: () => ({
            loading: 'Loading. . .',
            emptyInitResult: '这里还没有数据. . .',
            emptyQueryResult: '没有符合条件的结果. . .',
            noPermissions: '暂无权限'
        })
    }
});
const emits = defineEmits(['logout']);
const type = computed(() => props.type);
const loadingText = computed(() => ({
    loading: 'Loading. . .',
    emptyInitResult: '这里还没有数据. . .',
    emptyQueryResult: '没有符合条件的结果. . .',
    noPermissions: '暂无权限',
    ...props.loadingText
}));
const tip = computed(() => {
    return loadingText.value[props.actionType];
});
const logout = () => {
    emits('logout');
};

</script>

<script lang="ts">
export default {
    name: 'BPageLoading'
};
</script>
