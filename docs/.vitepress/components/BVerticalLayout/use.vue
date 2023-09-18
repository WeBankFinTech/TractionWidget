<template>
    <div style="height: 500px">
        <BVerticalLayout v-model:curPath="currentPath" :menus="menus" @menuChange="onMenuClick">
            <template v-slot:logo>
                    logo
            </template>
            <template v-slot:exElement>
                <FInput placeholder="请输入">
                    <template #suffix>
                        <SearchOutlined @click="search" />
                    </template>
                </FInput>
            </template>
            <template v-slot:userInfo>
                    <span class="user-name">管理员(admin)</span>
                    <FDivider vertical></FDivider>
                    <a
                        class="logout"
                        href="javascript:void(0)"
                        @click="handleLogout"
                    >退出</a>
            </template>
            <template v-slot:container>
                <div>
                    下方容器内容使用slot插槽,
                    当前选择菜单路径：{{currentPath}}
                </div>
            </template>
        </BVerticalLayout>
    </div>
</template>
<script setup lang="ts">
import { BVerticalLayout } from '@fesjs/traction-widget';
import { FDivider, FInput } from '@fesjs/fes-design';
import { ref, h} from 'vue';
import { AppstoreOutlined, DateOutlined,ClusterOutlined, SettingOutlined, SearchOutlined } from '@fesjs/fes-design/icon';

const currentPath = ref<string>('/rules/template1');
const menus = ref([
     {
        label: '规则模板1',
        value: '/rules/template1',
        icon: () => h(ClusterOutlined),
    },
     {
        label: '规则模板2',
        value: '/rules/template2',
        icon: () => h(ClusterOutlined),
    },
    {
        label: '规则模板3',
        value: '/rules/template3',
        icon: () => h(ClusterOutlined),
    },{
    label: '任务查询1',
    value: '/tasks',
    icon: () => h(AppstoreOutlined),
}])
const search = () => {
    console.log('查询');
}
const handleLogout = () => {
    console.log('退出登录');
    
}
const onMenuClick = (v: any) => {
    currentPath.value = v.value;
    console.log('onMenuClick-菜单跳转', currentPath.value);
};

</script>
<style scoped>
.user-name {
    white-space: nowrap;
}
.logout {
    white-space: nowrap;
    color: #63656f;
}
</style>