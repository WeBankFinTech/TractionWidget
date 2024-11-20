<template>
    <div class="wd-horizontal-layout">
        <div class="wd-side-menus" :class="{ collapse: isSideBarCollapse }">
            <div v-if="isSlotTop" class="wd-logo">
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
                    :defaultExpandAll="defaultExpandAll"
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

const isSlotTop = computed(() => !!useSlots().top);
const props = defineProps({
    // 当前选择的菜单项
    curPath: {
        type: String,
        require: true,
        default: ''
    },

    // 传入的菜单数据
    menus: {
        // eslint-disable-next-line no-use-before-define
        type: Array<MenuItem>,
        require: true,
        default: () => []
    },

    // 是否默认展开全部菜单项
    defaultExpandAll: {
        type: Boolean,
        require: false,
        default: false
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
const emit = defineEmits(['sideBarCollapse', 'menuChange', 'update:curPath']);
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
    emit('sideBarCollapse', isSideBarCollapse.value);
};

const expandedKeys = ref<string[] | null>([]);
interface MenuItem {
    label: string;
    value: string;
    icon?: any;
    children?: MenuItem[];
}

function findParentPath (menus: MenuItem[], targetPath: string): string[] {
    for (const menu of menus) {
        if (menu.value === targetPath) {
            return [menu.value]; // 找到目标路径，返回包含目标路径的数组
        }

        if (menu.children) {
            const parentPath = findParentPath(menu.children, targetPath);
            if (parentPath.length > 0) {
                return [menu.value, ...parentPath]; // 找到目标路径的父路径，返回包含父路径和目标路径的数组
            }
        }
    }

    // 没有找到匹配的路径，尝试匹配父路径
    for (const menu of menus) {
        if (targetPath.startsWith(menu.value)) {
            const parentPath = findParentPath(menu.children || [], targetPath);
            if (parentPath.length > 0) {
                return [menu.value, ...parentPath]; // 找到目标路径的父路径，返回包含父路径和目标路径的数组
            } else {
                if (menu.value !== targetPath) {
                    return [menu.value]; // 没有找到目标路径的父路径，返回当前路径
                }
            }
        }
    }

    return []; // 没有找到匹配的路径，返回空数组
}
watchEffect(() => {
    if (curPath.value) {
        console.log('当前路径', curPath.value, props.menus, findParentPath(props.menus, curPath.value));
        // 如/train/workflow，匹配到根路径，展开/train菜单
        expandedKeys.value = findParentPath(props.menus, curPath.value) || [];
    }
});

</script>

<script lang="ts">
export default {
    name: 'BHorizontalLayout'
};
</script>
