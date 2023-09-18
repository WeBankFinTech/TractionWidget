<template>
    <div class="wd-vertical-layout">
        <div class="vertical-nav" v-if="position === 'left'">
            <div class="vertical-menuInfo">
                <div class="logo">
                    <slot name="logo"></slot>
                </div>
                <FMenu class="menu-list"
                    mode="horizontal"
                    :modelValue="curPath"
                    :options="props.menus"
                    @select="onMenuClick"
                ></FMenu>
                <slot name="exElement"></slot>
            </div>
            <div class="vertical-userInfo">
                <slot name="userInfo"></slot>
            </div>
        </div>
        <div class="vertical-nav" v-else>
            <div class="vertical-menuInfo">
                <div class="logo">
                    <slot name="logo"></slot>
                </div>
            </div>
            <div class="vertical-userInfo">
                <FMenu class="menu-list"
                    mode="horizontal"
                    :modelValue="curPath"
                    :options="props.menus"
                    @select="onMenuClick"
                ></FMenu>
                <slot name="exElement"></slot>
                <slot name="userInfo"></slot>
            </div>
        </div>
        <div class="vertical-body">
            <slot name="container"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { FMenu } from '@fesjs/fes-design';

const props = defineProps({
    // 当前选择的菜单项
    curPath: {
        type: String,
        require: true,
        default: ''
    },
    // 传入的菜单数据
    menus: {
        type: Array,
        require: true,
        default: () => []
    },
    // 菜单位置，默认置于左侧
    position: {
        type: String,
        require: false,
        default: 'left'
    }
});
const emit = defineEmits(['menuChange', 'update:curPath']);
const curPath = computed({
    get () {
        return props.curPath;
    },
    set (val: string) {
        emit('update:curPath', val);
    }
});

// 菜单切换
const onMenuClick = (e: { value: string; }) => {
    emit('menuChange', e);
};
</script>

<script lang="ts">
export default {
    name: 'BVerticalLayout'
};
</script>
