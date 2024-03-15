<template>
    <div :class="layout === 'drawer' ? 'wd-nav-bar-drawer-parent' : ''">
        <div class="wd-nav-bar-page">
            <FScrollbar class="wd-nav-bar-scroll">
                 <FMenu
                    mode="horizontal"
                    :modelValue="curPath"
                    :options="props.data"
                    @select="updateActiveNavBar"
                ></FMenu>
            </FScrollbar>
        </div>
     </div>
</template>
<script setup lang="ts">
import { FScrollbar, FMenu } from '@fesjs/fes-design';
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    data: {
        type: Array,
        required: true,
        default: () => []
    },
    curPath: {
        type: String,
        required: true,
        default: ''
    },
    // 导航栏分page、drawer
    layout: {
        type: String,
        required: false,
        default: 'page'
    }
});
const emit = defineEmits(['update:curPath', 'navChange']);
const curPath = computed({
    get () {
        return props.curPath;
    },
    set (val: string) {
        emit('update:curPath', val);
    }
});
const updateActiveNavBar = async (e: { value: string; }) => {
    emit('navChange', e);
};
</script>
<script lang="ts">
export default {
    name: 'BNavBar'
};
</script>
