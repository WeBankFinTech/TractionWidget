<template>
    <div class="wd-horizontal-layout">
        <div class="wd-side-menus" :class="{ collapse: isSideBarCollapse }">
            <div v-if="isSlot" class="wd-logo">
                <slot name="top"></slot>
            </div>
            <div class="wd-menus-list">
                <FMenu
                    mode="vertical"
                    :modelValue="curPath"
                    :options="props.menus"
                    :collapsed="isSideBarCollapse"
                    @select="onMenuClick"
                    :expandedKeys="expandedKeys"
                ></FMenu>
            </div>
            <div class="collapse-btn" @click="toggleSideBar">
                <template v-if= "isSideBarCollapse"><RightOutlined /></template>
                <template v-else><LeftOutlined/></template>
            </div>
            <div v-if="isFoot" class="copyright">
                {{footText}}
            </div>
        </div>
        <div class ="right-container">
            <slot name="container"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, useSlots, watchEffect } from 'vue';
import { FMenu } from '@fesjs/fes-design';
import { RightOutlined, LeftOutlined } from '@fesjs/fes-design/icon';

const isSlot = !!useSlots().top;
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
    // 是否展示注脚
    isFoot: {
        type: Boolean,
        require: false,
        default: true
    },
    // 注脚文字内容
    footText: {
        type: String,
        require: false,
        default: 'WeDataSphere版权所有'
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

// 折叠或者展开菜单
const isSideBarCollapse = ref(false);
const toggleSideBar = () => {
    isSideBarCollapse.value = !isSideBarCollapse.value;
};

const expandedKeys = ref<string[]>([]);
watchEffect(() => {
    if(curPath.value) {
        // 如/train/workflow，匹配到根路径，展开/train菜单
        const regex = /^\/\w+/;
        const match = curPath.value.match(regex);
        if (match) expandedKeys.value = [match[0]];
    }
})

</script>

<script lang="ts">
export default {
    name: 'BHorizontalLayout'
};
</script>
