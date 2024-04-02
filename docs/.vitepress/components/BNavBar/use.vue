<template>
    <div class="eg-page">
        <BNavBar v-model:curPath="curPath" :data="bars" @navChange="handleNavChange"></BNavBar>
        <div>
            <template v-if="curPath === '/nav1'">
                <FButton @click="openDrawer">抽屉中导航栏</FButton>
            </template>
            <template v-else>
                当前路径: {{curPath}}
            </template>
        </div>
         <FDrawer
            v-model:show="showDrawer"
            title="这里是抽屉"
            displayDirective="if"
            width=50%
        >
            <div>
               <BNavBar v-model:curPath="curPath" :data="bars" @navChange="handleNavChange" layout="drawer"></BNavBar>
                当前路径: {{curPath}}
            </div>
        </FDrawer>
    </div>
</template>
<script setup lang="ts">
import { ref, watch, h } from 'vue';
import { BNavBar } from '@fesjs/traction-widget';
import { AppstoreOutlined, DateOutlined, SettingOutlined } from '@fesjs/fes-design/icon';
import { FDrawer, FButton} from '@fesjs/fes-design';

const bars = [
    { label: '导航菜单1', value: '/nav1', icon: () => h(SettingOutlined)},
    { label: '导航菜单2', value: '/nav2', icon: () => h(DateOutlined) },
    { label: '导航菜单3', value: '/nav3', icon: () => h(AppstoreOutlined) },
];
const showDrawer = ref<Boolean>(false);
const curPath = ref<String>(bars[0].value);
const handleNavChange = (v: any) => {
    // 做路由跳转或显示组件切换处理
    curPath.value = v.value;
    console.log('handleNavChange-导航栏切换', curPath.value);
}
const openDrawer = () => {
    showDrawer.value = true;
};
</script>
<style scoped>
.eg-page {
    display: grid;
    padding: 16px 24px;
    height: 100%;
    background: #f7f7f8;
}
</style>>